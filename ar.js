import {ChatOpenAI} from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio"; 
import * as dotenv from 'dotenv';
dotenv.config();

//initialize LLM
const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.7,
});
//initialize prompt
const prompt_template = ChatPromptTemplate.fromTemplate("Answer the question based on the context. Question: {input} Context: {context}");
//initialize Chain with PROMPT AND LLM
const chain = await createStuffDocumentsChain({
   llm: llm,
   prompt: prompt_template, 
});
//initialize documents
const loader = new CheerioWebBaseLoader(
   "https://www.cbr.com/legend-of-the-northern-blade-jin-kwan-ho-silent-night/" 
);
const docs = await loader.load()
console.log(docs)

const response = await chain.invoke({
    input: "what is silent night?"
    context: docs,
});

console.log(response);
                        
