import { type NextRequest, NextResponse } from "next/server"
import { getContentById, getNarratorInfo, getRelatedContent } from "@/lib/islamic-database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const content = getContentById(id)

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Get additional information for hadith
    let narratorInfo = null
    let sanadDetails = null

    if (content.type === "hadith") {
      const hadith = content as any

      // Get narrator information
      const narratorId = hadith.narrator
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      narratorInfo = getNarratorInfo(narratorId)

      // Get detailed sanad information
      sanadDetails = hadith.sanad?.map((narratorName: string, index: number) => ({
        name: narratorName,
        position: index + 1,
        reliability: "Thiqah", // Default, would be looked up in real implementation
      }))
    }

    // Get related content
    const relatedContent = getRelatedContent(id)

    return NextResponse.json({
      content,
      narratorInfo,
      sanadDetails,
      relatedContent,
    })
  } catch (error) {
    console.error("Hadith detail API error:", error)
    return NextResponse.json({ error: "Failed to fetch content details" }, { status: 500 })
  }
}
