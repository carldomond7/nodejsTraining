import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import * as dotenv from 'dotenv';
dotenv.config();

//initialize LLM
const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate('You are a comedian. Tell a joke based on the following word {input}');

console.log(await prompt.format({input: "beyblade"}));

//initialize chain
const chain = prompt.pipe(llm);
const response = await chain.stream({input: "beyblade"});
for await (const chunk of response) {
        console.log(chunk?.content);
}
