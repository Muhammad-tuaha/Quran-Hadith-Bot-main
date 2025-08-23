import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { searchIslamicContent, type HadithRecord, type QuranRecord } from "@/lib/islamic-database"

interface SearchRequest {
  query: string
  searchType: string
  selectedCollections: string[]
  selectedGrades: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json()
    const { query, searchType, selectedCollections, selectedGrades } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const databaseResults = searchIslamicContent(
      query,
      searchType as "all" | "hadith" | "quran",
      selectedCollections,
      selectedGrades,
    )

    const systemPrompt = `You are an expert Islamic scholar and AI assistant specializing in authentic Islamic knowledge. You have access to a comprehensive database of Hadith and Quranic verses.

Based on the search query "${query}", I found ${databaseResults.length} relevant results from the database. Please enhance these results with additional scholarly context and ensure accuracy.

Guidelines:
1. Verify and enhance the provided Islamic content
2. Add scholarly commentary where appropriate
3. Ensure proper attribution and grading
4. Provide additional context for better understanding
5. Maintain authenticity and respect for Islamic scholarship

Database Results:
${JSON.stringify(databaseResults.slice(0, 5), null, 2)}

Please return these results in the same JSON format, enhanced with your scholarly knowledge.`

    const userPrompt = `Enhance and verify these Islamic knowledge search results for: "${query}"`

    let results: (HadithRecord | QuranRecord)[] = databaseResults

    if (databaseResults.length > 0) {
      try {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          system: systemPrompt,
          prompt: userPrompt,
          temperature: 0.2,
        })

        // Try to parse enhanced results from AI
        const enhancedResults = JSON.parse(text)
        if (Array.isArray(enhancedResults) && enhancedResults.length > 0) {
          results = enhancedResults
        }
      } catch (aiError) {
        console.log("AI enhancement failed, using database results:", aiError)
        // Continue with database results if AI fails
      }
    }

    // Format results for frontend
    const formattedResults = results.map((result) => ({
      id: result.id,
      type: result.type,
      text: result.text,
      arabicText: result.arabicText,
      source: result.source,
      book: result.type === "hadith" ? (result as HadithRecord).book : undefined,
      hadithNumber: result.type === "hadith" ? (result as HadithRecord).hadithNumber : undefined,
      surah: result.type === "quran" ? (result as QuranRecord).surah : undefined,
      ayah: result.type === "quran" ? (result as QuranRecord).ayah : undefined,
      grade: result.type === "hadith" ? (result as HadithRecord).grade : undefined,
      gradeColor: result.type === "hadith" ? getGradeColor((result as HadithRecord).grade) : undefined,
      narrator: result.type === "hadith" ? (result as HadithRecord).narrator : undefined,
      chainLength: result.type === "hadith" ? (result as HadithRecord).chainLength : undefined,
      revelation: result.type === "quran" ? (result as QuranRecord).revelation : undefined,
      topic: Array.isArray(result.topic) ? result.topic.join(", ") : result.topic,
      relevanceScore: result.relevanceScore || 85,
    }))

    return NextResponse.json({
      results: formattedResults,
      query,
      totalResults: formattedResults.length,
      searchType,
      filters: {
        collections: selectedCollections,
        grades: selectedGrades,
      },
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to process search request" }, { status: 500 })
  }
}

function getGradeColor(grade: string): string {
  switch (grade?.toLowerCase()) {
    case "sahih":
      return "bg-green-100 text-green-800"
    case "hasan":
      return "bg-blue-100 text-blue-800"
    case "da'if":
    case "daif":
      return "bg-yellow-100 text-yellow-800"
    case "maudu'":
    case "maudu":
      return "bg-red-100 text-red-800"
    default:
      return "bg-green-100 text-green-800"
  }
}
