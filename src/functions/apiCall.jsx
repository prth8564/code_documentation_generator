export async function query(data) {
    const response = await fetch(
        "http://localhost:8000/geminiCall",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result.output.replace(/^```(\w+)?\n|```$/g, "").trim();;
}