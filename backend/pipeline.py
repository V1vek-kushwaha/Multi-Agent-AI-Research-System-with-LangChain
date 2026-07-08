from agents import build_search_agent, build_reader_agent, writer_chain, critic_chain

def run_research_pipeline(topic :str) -> dict:

    state={}
       #search agent working 
    print("\n"+" ="*50)
    print("step 1 - search agent is working ...")
    print("="*50)

    # Step 1: Search for relevant information
    search_agent = build_search_agent()
    search_results = search_agent.invoke({
        "messages": [
            {"role": "user", "content": f"Please search for reliable and detailed information about {topic}."}
        ]
    })
    state['search_results'] = search_results['messages'][-1].content  # Store the search results in the state dictionary    
    # print(f"Search Results:\n{state['search_results']}\n")

    # Step 2: Read and extract information from the search results
    print("\n"+" ="*50)
    print("step 2 - Reader agent is scraping top resources ...")
    print("="*50)

    reader_agent = build_reader_agent()
    research_data = reader_agent.invoke({
        "messages": [("user",
            f"Based on thefollowing search results about: '{topic}',"
            f"pick the most relevant URL and scrape it for deeper content \n\n"
            f"Search Results:\n{state['search_results'][:800]}\n"
        )]
    })

    state['research_data'] = research_data['messages'][-1].content  # Store the research data in the state dictionary

    # Step 3: Generate a research report
    print("\n"+" ="*50)
    print("step 3 - Writer is drafting the report ...")
    print("="*50)

    research_combined = (
        f"Search Results:\n{state['search_results']}\n\n"
        f"Scraped Research Data:\n{state['research_data']}"
    )

    state['report'] = writer_chain.invoke({"topic": topic, "research": research_combined})

    # print(f"\n Generated Report:\n{state['report']}\n")
    # Step 4: Critique the generated report
    print("\n"+" ="*50)
    print("step 4 - critic is reviewing the report ")
    print("="*50)

    state['critic_response'] = critic_chain.invoke({"report": state['report']})
    # print(f"\n Critique of the Report:\n{state['critic_response']}\n")

    return state
    

if __name__ == "__main__":
    topic = input("\nEnter the research topic: ")
    run_research_pipeline(topic)