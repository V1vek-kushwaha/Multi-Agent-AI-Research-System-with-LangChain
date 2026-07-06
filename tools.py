from langchain.tools import tool
import requests
from bs4 import BeautifulSoup
import os
from tavily import TavilyClient
from rich import print
from dotenv import load_dotenv
load_dotenv()

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool
def web_search(query : str) ->str:
    """Search the web for recent and reliable information on a topic . Retuns Titels , URLs and snippets"""
    results = tavily.search(query=query,max_results=5) #save tokens using max results
    
    out = []

    # print(results)
    for r in results['results']:
        out.append(
            f"Title: {r['title']}\n URL: {r['url']}\n Content: {r['content'][:300]}\n"
        )
    return "\n----\n".join(out)

@tool
def scrape_webpage(url: str) -> str:
    """Scrape and extract readable text content from a webpage URL using BeautifulSoup."""
    try:
        response = requests.get(url, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
    except requests.RequestException as e:
        return f"Failed to fetch the page: {e}"

    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    text = " ".join(soup.get_text(separator="\n").split())
    return text[:5000] if len(text) > 5000 else text

print(scrape_webpage.invoke("https://www.aajtak.in/"))   