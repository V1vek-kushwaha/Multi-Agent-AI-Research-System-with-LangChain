from agents import build_search_agent, build_reader_agent, writer_chain, critic_prompt

def run_research_pipeline(topic :str) -> dict:

    state={}
    
    # Step 1: Search for relevant information
    search_agent = build_search_agent()
    search_results = search_agent.run({
        "messages": [
            {"role": "user", "content": f"Please search for reliable and detailed information about {topic}."}
        ]
    })

    # Step 2: Read and extract information from the search results
    reader_agent = build_reader_agent()
    research_data = reader_agent.run(search_results)

    # Step 3: Generate a research report
    report = writer_chain.run(topic=topic, research=research_data)

    # Step 4: Critique the generated report
    critic_response = critic_prompt.format(report=report)
    
    return report, critic_response