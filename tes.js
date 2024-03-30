import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import { StringOutputParser, CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import * as dotenv from 'dotenv';
dotenv.config();

//initialize LLM
const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.7,
});

//initialize function
async function callStringParser(){

const prompt = ChatPromptTemplate.fromMessages([
        ["system", "Generate a detailed approach on how to get kids interested in tech based on the tech subject the user specifies."],
        ["human", "{input}"],
]);
//initialize parser
const parser = new StringOutputParser();


//initialize chain
const chain = prompt.pipe(llm).pipe(parser);
return await chain.invoke({
        input: "DNS",
});
}

async function callListParser(){
   const prompt = ChatPromptTemplate.fromTemplate('Provide 5 synonyms, seperated by commas, for the following word {word}');
   const outputparser = new CommaSeparatedListOutputParser();

   const chain = prompt.pipe(llm).pipe(outputparser);
   return await chain.invoke({
        word: "creativity"
   })
}
