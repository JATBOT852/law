

#! pip install langchain langchain-core langchain-community flask

# Commented out IPython magic to ensure Python compatibility.

# %load_ext colabxterm
# %xterm
#curl -fsSL https://ollama.com/install.sh | sh
#ollama serve & ollma run  llama3

#whatollama pull llama3

# from langchain_community.llms import ollama
# llm = ollama.Ollama(model="llama3")
# llm.invoke("what is profit&loss account?")

# ! pip install langchain_community

# pip install langchain

from flask import Flask, request, jsonify, render_template
from langchain_community.llms import ollama
from langchain.prompts import PromptTemplate

app = Flask(__name__)

# Initialize the language model
llm = ollama.Ollama(model="llama3")

DEFAULT_SYSTEM_PROMPT = """\
You are an expert Indian legal adviser with extensive knowledge of the Indian Constitution and the Indian Penal Code (IPC).
Always provide the most accurate and reliable legal advices, adhering strictly to legal standards. Ensure your responses are free from harmful, unethical, or irrelevant content.
Only provide information relevant to legal questions. If a query is outside your legal expertise, simply apologize and state that you cannot provide non-legal information."""

prompt_template = PromptTemplate(
    input_variables=["questions"],
    template=f"""Legal Questions: {{questions}}

Please provide only legal information. If the question is outside your expertise, apologize and refrain from giving non-legal information."""
)

@app.route('/')
def index():
    return "succesfull"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    questions = data.get('questions', '')
    prompt_text = prompt_template.format(questions=questions)

    response = llm(prompt_text)
    formatted_response = response.replace("**", "")
   

    return jsonify({'response': formatted_response,"question":questions})

if __name__ == '__main__':
    app.run(host='0.0.0.0'port=8080)



