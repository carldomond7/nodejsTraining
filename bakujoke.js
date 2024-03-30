import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import * as dotenv from 'dotenv';
dotenv.config();

//initialize LLM
const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
        ["system", "Generate a joke based on a word provided by the user."],
        ["human", "{input}"],
]);

//initialize chain
const chain = prompt.pipe(llm);
const response = await chain.stream({input: "bakugan"});
for await (const chunk of response)
        {
           console.log(chunk?.content);
        }

console.log(response);
~                                                                                              
~                                                                                              
~                                                                                              
~                                                                                              
~                                                                                              
~                                                                                              
~                               
