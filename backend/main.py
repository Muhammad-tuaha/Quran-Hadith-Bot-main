#!/usr/bin/env python
# coding: utf-8

# 

# In[1]:


#get_ipython().run_line_magic('pip', 'install sqlalchemy')
#get_ipython().run_line_magic('pip', 'install sympy')


# In[2]:


from sqlalchemy.dialects.mysql.mariadb import loader
from sympy.codegen.fnodes import dimension
#get_ipython().run_line_magic('pip', 'install langchain_community')



# In[3]:


import os

current_dir = os.getcwd()
print(current_dir)


# In[4]:


# from langchain_community.document_loaders.csv_loader import CSVLoader
# loader=CSVLoader(file_path="/content/all_hadiths_clean.csv",encoding="utf-8")
# docs=loader.load()
# print(len(docs))


# In[5]:


# print(type(docs))
# print(len(docs[444].page_content.split()))
# print(docs[444])


# In[6]:


# def countTokens(text):
#     return len(text.split())
# maxTokens = 0
# maxIndex = -1
# for i, doc in enumerate(docs):
#     token_count = countTokens(doc.page_content)
#     if token_count > maxTokens:
#         maxTokens = token_count
#         maxIndex = i

# print(maxTokens)


# In[7]:


# print(token_count)


# In[8]:


#get_ipython().run_line_magic('pip', 'install --upgrade --quiet  langchain langchain-huggingface sentence_transformers')


# In[9]:


#get_ipython().system('pip install tiktoken')


# In[10]:


#get_ipython().system('pip install pandas')


# QURAN DATA processing
# Loading
# creating document a=object manually {adding metadata and content}
# chunks creation for bigger ayahs that might gets truncated if not within token limit

# In[11]:


import pandas as pd
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
import math

def clean_value(value):
    if value is None:
        return 0
    if isinstance(value, float) and pd.isna(value):  # catches NaN
        return 0
    if str(value).lower() in ["nan", "null", "none"]:
        return 0
    return value

# 1. Load the CSV file into a Pandas DataFrame
df = pd.read_csv('The Quran Dataset.csv')

# 2. Create a list of LangChain Document objects manually
docs = []
for index, row in df.iterrows():

    # Construct the metadata dictionary
    metadata = {
    'surah_no': clean_value(row.get('surah_no')),
    'surah_name_en': clean_value(row.get('surah_name_en')),
    'surah_name_ar': clean_value(row.get('surah_name_ar')),
    'surah_name_roman': clean_value(row.get('surah_name_roman')),
    'ayah_no_surah': clean_value(row.get('ayah_no_surah')),
    'ayah_no_quran': clean_value(row.get('ayah_no_quran')),
    'ayah_ar': clean_value(row.get('ayah_ar')),
    'ayah_en': clean_value(row.get('ayah_en')),
    'ruko_no': clean_value(row.get('ruko_no')),
    'juz_no': clean_value(row.get('juz_no')),
    'manzil_no': clean_value(row.get('manzil_no')),
    'hizb_quarter': clean_value(row.get('hizb_quarter')),
    'total_ayah_surah': clean_value(row.get('total_ayah_surah')),
    'total_ayah_quran': clean_value(row.get('total_ayah_quran')),
    'place_of_revelation': clean_value(row.get('place_of_revelation')),
    'sajdah_ayah': clean_value(row.get('sajah_ayah')),
    'sajdah_no': clean_value(row.get('sajdah_no')),
    'no_of_word_ayah': clean_value(row.get('no_of_word_ayah')),
    'list_of_words': clean_value(row.get('list_of_words'))
}

     # Construct the page_content
    # This will be the text we want the embeddings to represent.
    page_content = f"AyahArabic: {row['ayah_ar']}\nAyahEnglish: {row['ayah_en']}"

    # Create the Document object and add it to our list
    docs.append(Document(page_content=page_content, metadata=metadata))

# 3. Now, pass this correctly structured list of documents to the splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

# This will split your documents correctly and preserve the metadata
all_Quran_chunks = text_splitter.split_documents(docs)

# You can now check the size and content of your new chunks
print(f"Number of chunks: {len(all_Quran_chunks)}")
print("Example chunk:",all_Quran_chunks[2])


# Hadith data processing

# In[12]:


import pandas as pd
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 1. Load the CSV file into a Pandas DataFrame
df = pd.read_csv('all_hadiths_clean.csv')

# 2. Create a list of LangChain Document objects manually
docs = []
for index, row in df.iterrows():
    # Construct the metadata dictionary
    metadata = {
        'id': row['id'],
        'hadith_id': row['hadith_id'],
        'source': row['source'],
        'chapter_no': row['chapter_no'],
        'hadith_no': row['hadith_no'],
        'chapter': row['chapter'],
    }

    # Construct the page_content
    # This will be the text we want the embeddings to represent.
    page_content = f"Arabic: {row['text_ar']}\nEnglish: {row['text_en']}"

    # Create the Document object and add it to our list
    docs.append(Document(page_content=page_content, metadata=metadata))

# 3. Now, pass this correctly structured list of documents to the splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

# This will split your documents correctly and preserve the metadata
all_hadith_chunks = text_splitter.split_documents(docs)

# You can now check the size and content of your new chunks
print(f"Number of chunks: {len(all_hadith_chunks)}")
print("Example chunk:")


# In[ ]:





# In[13]:


#get_ipython().system('pip install -qU langchain langchain-pinecone langchain-openai')


# In[14]:


#get_ipython().system('pip install dotenv')


# In[15]:


import os
from dotenv import load_dotenv
from pinecone import Pinecone
load_dotenv()
# This line checks if the Pinecone API key exists as a Colab Secret.
# If you don't have a secret named PINECONE_API_KEY, it will raise an error.
try:
    pinecone_api_key = os.getenv("PINECONE_API_KEY")
except Exception as e:
    raise ValueError("'PINECONE_API_KEY' not found. Please add your key to the Secrets panel.") from e

pc = Pinecone(api_key=pinecone_api_key)


# In[ ]:





# In[16]:


#get_ipython().system('pip install huggingface_hub')
#get_ipython().run_line_magic('pip', 'install --upgrade --quiet  langchain langchain-huggingface sentence_transformers')


# Hadith index initialization in pinecone

# In[17]:


from pinecone import  ServerlessSpec

# 1. Initialize the Pinecone client
# This uses your API key and environment to connect.


# 2. Define your index parameters
index_name = "hadith-rag-index" # Choose a unique, descriptive name
dimension = 1024 # Match the output dimension of your embedding model
metric = "cosine" # Cosine similarity is a good default for semantic search

# 3. Check if the index already exists
if index_name not in pc.list_indexes().names():
    print(f"Creating a new Pinecone index: {index_name}...")
    pc.create_index(
        name=index_name,
        dimension=dimension,
        metric=metric,
        spec=ServerlessSpec(cloud='aws', region='us-east-1')
    )
    print("Index created successfully!")
else:
    print(f"Index '{index_name}' already exists.")

# 4. Now you have an active index that you can connect to.
pinecone_index = pc.Index(index_name)


# Hadith embeddings->pinecone index
# Adding embeddings of hadith chunks to the pinecone index (hadith rag index)

# In[18]:


###CODE TO create and store embeddings in the vector store
###commennted so that i dont accidentally recreate embeddings
#=========######################################=============
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_pinecone import PineconeVectorStore
# embeddingModel= HuggingFaceEmbeddings(model_name="omarelshehy/arabic-english-sts-matryoshka-v2.0")

# vectorStore=PineconeVectorStore(index=pinecone_index,embedding=embeddingModel)
# vectorStore.add_documents(documents=all_hadith_chunks)


# In[19]:


import os
from dotenv import load_dotenv
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()
# Get API key from Colab secrets
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_index_name = "hadith-rag-index" # You should set your index name here

# Set the Pinecone API key as an environment variable
os.environ["PINECONE_API_KEY"] = pinecone_api_key

# 1. Initialize your embedding model
embeddingModel = HuggingFaceEmbeddings(model_name="omarelshehy/arabic-english-sts-matryoshka-v2.0")

# 2. Re-initialize the vector store by connecting to the existing index
# Note: The `from_existing_index` method does NOT take an API key as a parameter,
# but relies on the PINECONE_API_KEY environment variable.
vectorStore = PineconeVectorStore.from_existing_index(

    index_name=pinecone_index_name,
    embedding=embeddingModel
)

# # You can now perform a similarity search with the vectorStore object
# query = "how to pray namaz according to hadith"
# results = vectorStore.similarity_search(query, k=5)

# print(results)


# Quran index initialization in pinecone

# In[20]:


from pinecone import  ServerlessSpec

# 1. Initialize the Pinecone client
# This uses your API key and environment to connect.


# 2. Define your index parameters
Quran_index_name = "quran-rag-index" # Choose a unique, descriptive name
dimension = 1024 # Match the output dimension of your embedding model
metric = "cosine" # Cosine similarity is a good default for semantic search

# 3. Check if the index already exists
if Quran_index_name not in pc.list_indexes().names():
    print(f"Creating a new Pinecone index: {Quran_index_name}...")
    pc.create_index(
        name=Quran_index_name,
        dimension=dimension,
        metric=metric,
        spec=ServerlessSpec(cloud='aws', region='us-east-1')
    )
    print("Index created successfully!")
else:
    print(f"Index '{Quran_index_name}' already exists.")

# 4. Now you have an active index that you can connect to.
pinecone_Quran_index = pc.Index(Quran_index_name)


# below code is run only once in his lifetime , as it will simply add embeddings to the index 
# running it every time will keep adding indexes over indexes i.e repeating quran or hadith embeddings

# In[21]:


# ###CODE TO create and store embeddings in the vector store
# ###commented so that i dont accidentally recreate embeddings
# #=========######################################=============
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_pinecone import PineconeVectorStore
# embeddingModel= HuggingFaceEmbeddings(model_name="omarelshehy/arabic-english-sts-matryoshka-v2.0")

# Quran_vectorStore=PineconeVectorStore(index=pinecone_Quran_index,embedding=embeddingModel)
# Quran_vectorStore.add_documents(documents=all_Quran_chunks)


# below code is to initialize index after that we have created the index so that we dont have to run the above code everytime

# In[22]:


import os
from dotenv import load_dotenv
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()
# Get API key from Colab secrets
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_index_name = "quran-rag-index" # You should set your index name here

# Set the Pinecone API key as an environment variable
os.environ["PINECONE_API_KEY"] = pinecone_api_key

# 1. Initialize your embedding model
embeddingModel = HuggingFaceEmbeddings(model_name="omarelshehy/arabic-english-sts-matryoshka-v2.0")

# 2. Re-initialize the vector store by connecting to the existing index
# Note: The `from_existing_index` method does NOT take an API key as a parameter,
# but relies on the PINECONE_API_KEY environment variable.
Quran_vectorStore = PineconeVectorStore.from_existing_index(

    index_name=pinecone_index_name,
    embedding=embeddingModel
)

# # You can now perform a similarity search with the vectorStore object
# query = "how to pray namaz according to hadith"
# results = vectorStore.similarity_search(query, k=5)

# print(results)


# In[23]:


#Quran_vectorStore.similarity_search("morality")


# In[24]:


#get_ipython().run_line_magic('pip', 'install -U langchain-google-genai')


# In[25]:


# import os
# from google.colab import userdata
# from langchain_google_genai import ChatGoogleGenerativeAI

# # Retrieve your API key from Colab secrets
# os.environ["GOOGLE_API_KEY"] = userdata.get("GOOGLE_API_KEY")

# # Initialize the Gemini model
# llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)

# # Now you can use the 'llm' object to interact with the model
# response = llm.invoke("What is a Large Language Model?")
# print(response.content)


# In[26]:


# from langchain.chains import RetrievalQA

# # Assuming you have successfully run the previous cells to initialize these
# # llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)
# # vectorStore = PineconeVectorStore.from_existing_index(...)

# # 1. Create a retriever from your vector store
# retriever = vectorStore.as_retriever()

# # 2. Create the RetrievalQA chain
# qa_chain = RetrievalQA.from_chain_type(
#     llm=llm,
#     chain_type="stuff", # This packs all the retrieved documents into one prompt
#     retriever=retriever
# )

# # 3. Use the chain to get a final, synthesized answer
# query = "What is the hadith about the best charity?"
# result = qa_chain.invoke(query)

# # The result is a dictionary; the answer is in the 'result' key
# print(result['result'])


# In[27]:


# from ast import parse
# from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, HumanMessagePromptTemplate
# from langchain.chains import RetrievalQA

# parser=StrOutputParser()
# question="What is the hadith about the best charity?"
# contextRetriever=vectorStore.similarity_search(question,k=5)
# prompt=ChatPromptTemplate(
#     messages=[
#         SystemMessagePromptTemplate.from_template("You are a helpful assistant who answers questions about the hadith from the given context{context} ;try to keep answer brief unless asked by the user , provide complete hadith if user specifically ask about haditha nd later exapplain that hadith as per users question.Also whenever you quote a hadith show hadith number source and chapter from the metadata,and as per user request do show user arabic text of the hadith"),

#         HumanMessagePromptTemplate.from_template("{question}")
#     ]
# )
# chain=prompt|llm|parser
# chain.invoke({"context":context,"question":question})


# In[28]:


#get_ipython().system('pip install langchain-core langgraph>0.2.27')

#get_ipython().system('pip install langgraph-checkpoint-sqlite')


# In[29]:


from re import S
import os
from langchain_core.output_parsers import StrOutputParser
import sqlite3
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.graph import StateGraph, END, START
from langgraph.checkpoint.sqlite import SqliteSaver
from typing import TypedDict, Annotated, Sequence
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from typing import Optional
from langchain.memory import ConversationBufferWindowMemory

load_dotenv()

# # Retrieve your API key from Colab secrets
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# Initialize the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)
parser=StrOutputParser()
prompt=ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template("""""You are **ISLAM AI ASSISTANT**.  
Your rules:  
- Only answer from the provided **context: {context}**.  
- Apply the **filter: {Filter}** → only use sources allowed by the filter.  
- If no answer exists in the context → respond with an apology.  
- Provide metadata:  
  - If **Quran** → show Arabic + English + surah/ayah reference.  
  - If **Hadith** → show English text + arabic + book + hadith number + grade.  
- Answers must be **brief, direct, and to the question**.  
- Never use your own knowledge or external data.  
- Use past **message history** for consistency.  
- Never provide Quran or Hadith outside the context.
- In case where answer in hadith or quran or both is not found , mark all the field of it as none and in summary apologize i couldnt find the answer                                                   
- summary should be a direct answer to the question based on the ayah and hadith in your response , always give **verified scholarly analysis** .  


Always  strictly format output in the following JSON format:  


{{
  "summary": "direct answering the user's question",
  "references": [
    {{
      "type": "Quran",
      "surah": "Al-Ikhlas",
      "ayahNumber": "1-4",
      "ayahArabic": "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      "ayahEnglish": "Say: He is Allah, One.",
      "reference": "Quran 112:1-4"
    }},
    {{
      "type": "Hadith",
      "book": "Sahih al-Bukhari",
      "hadithNumber": "13",
      "grade": "Sahih",
      "textArabic": "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      "textEnglish": "Actions are judged by intentions."
    }}
  ]
}}
"""""),

        MessagesPlaceholder(variable_name="messages")
    ]
)

class RAGState(TypedDict):#Typeddictionary is specified dictionary where we specify attributes and their type hints(value types)
    # This is our shared state schema
    messages: Annotated[list, lambda x, y: x + y]#here we specify messages to be the list and it would keep appending user messages
    documents: Sequence[Document]
    filters: Annotated[Optional[str], lambda x, y: y or x]




def retrieveDocuments(state: RAGState):
    # This node reads the latest message from the state
    question = state["messages"][-1].content
    # ... then performs retrieval ...

    if state["filters"] == "Quran":
        retrieved_docs=Quran_vectorStore.similarity_search(question,k=5)
    elif state["filters"] =="Ahadith":
        retrieved_docs=vectorStore.similarity_search(question,k=5)
    else:

        AhadithRetrieved=vectorStore.similarity_search(question,k=5)
        QuranRetrieved=Quran_vectorStore.similarity_search(question,k=5)
        retrieved_docs = AhadithRetrieved + QuranRetrieved



    # ... and returns the updates to the state
    return {"documents": retrieved_docs}



def generate_answer(state: RAGState):
    # This node reads both the messages and the documents from the state
    messages = state["messages"]
    documents = state["documents"]
    ffilter=state["filters"]

    if len(messages) > 10:
        messages = messages[-10:]  
        state["messages"] = messages

     #  Limit documents to last 5
    if len(documents) > 5:
        documents = documents[-5:]
        state["documents"] = documents


    # ... then performs LLM generation with a prompt template ...

    full_prompt = prompt.partial(context=documents,Filter=ffilter)#fills few of the parameters here context

    # Invoke the LLM with the full message history
    new_message = parser.invoke(llm.invoke(full_prompt.invoke({"messages": messages})))
    # Extract the content of the latest message, which is the user's question


    # # Invoke the prompt with the correct arguments
    # new_message = parser.invoke(llm.invoke(prompt.invoke({"context": documents, "question": question})))

    return {"messages": [AIMessage(content=new_message)]}
# Define the graph
workflow = StateGraph(state_schema=RAGState)

# Add the 'model' node and connect it to the START of the graph
workflow.add_node("retriever",retrieveDocuments )
workflow.add_node("generate", generate_answer)
workflow.add_edge(START, "retriever")
workflow.add_edge("retriever", "generate")
workflow.add_edge("generate", END) # End the graph after the model responds


# Create/connect to the SQLite database
conn = sqlite3.connect("chatbot_memory.sqlite", check_same_thread=False)
memory = SqliteSaver(conn)

app = workflow.compile(checkpointer=memory)
# --- Start a conversation with a unique ID ---
thread_id = "my_first_chat"
config2= {"configurable": {"thread_id": thread_id}}

  # First turn of the conversation
  # print("--- Turn 1 ---")
  # response1 = app.invoke({"messages": [HumanMessage(content="on the basis of these ahadith how should we pray janazah")]}, config=config)
  # print("Bot:", response1['messages'][-1].content)

  # # Second turn: The app will automatically load the previous messages
  # print("\n--- Turn 2 ---")
  # response2 = app.invoke({"messages": [HumanMessage(content="my nam is taha keep it engraved ")]}, config=config2)
  # print("Bot:", response2['messages'][-1].content)
  # Quran only
# response1 = app.invoke(
#     {
#         "messages": [HumanMessage(content="Give me the ayah about patience")],
#         "filters": "Quran"
#     },
#     config=config2
# )

# # Ahadith only
# response2 = app.invoke(
#     {
#         "messages": [HumanMessage(content="How to pray Janazah?")],
#         "filters": "Ahadith"
#     },
#     config=config2
# )

# Both
response3 = app.invoke(
    {
        "messages": [HumanMessage(content="also provide hadith")],
        "filters": "both"  # or "All"
    },
    config=config2
)

response3['messages'][-1].content.strip().removeprefix("```json").removesuffix("```").strip()



# In[30]:


import json
cleaned = response3['messages'][-1].content.strip().removeprefix("```json").removesuffix("```").strip()
cleaned
data = json.loads(cleaned)
data# response2


# In[31]:


# get_ipython().system('pip install "uvicorn[standard]"')


# In[32]:


# get_ipython().run_line_magic('pip', 'install fastapi')


# In[ ]:


from fastapi import FastAPI
import uvicorn
import nest_asyncio
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware




nest_asyncio.apply()


App = FastAPI()

App.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allow Jupyter event loop to work with Uvicorn

@App.post("/chat")
def HadithBot(payload: dict):
    Question = payload.get("Question")
    filter_set = payload.get("filter")


    userID=payload.get("userID")
    BotResponse = app.invoke({"messages": [HumanMessage(content=Question)], "filters": filter_set}, config={"configurable": {"thread_id": userID}}
)
    cleaned = BotResponse['messages'][-1].content.strip().removeprefix("```json").removesuffix("```").strip()
    data=json.loads(cleaned)
    return data

# uvicorn.run(App,host="127.0.0.1",port=8001)

