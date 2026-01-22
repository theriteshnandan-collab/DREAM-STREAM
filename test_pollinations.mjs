// Test Pollinations API
const testPollinations = async () => {
    const API_KEY = "sk_WAOYDbCUZUrfvPJV1HRIewdWoEnwcIRE";
    const prompt = "a beautiful sunset";
    const encodedPrompt = encodeURIComponent(prompt);

    console.log("Testing Pollinations API...");
    console.log(`URL: https://gen.pollinations.ai/image/${encodedPrompt}`);
    console.log(`API Key: ${API_KEY.substring(0, 10)}...`);

    try {
        const response = await fetch(`https://gen.pollinations.ai/image/${encodedPrompt}?model=turbo`, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });

        console.log(`Status: ${response.status}`);
        console.log(`Status Text: ${response.statusText}`);
        console.log(`Content-Type: ${response.headers.get('content-type')}`);

        if (response.ok) {
            const buffer = await response.arrayBuffer();
            console.log(`Image Size: ${buffer.byteLength} bytes`);
            console.log("SUCCESS! API key works.");
        } else {
            const text = await response.text();
            console.log(`Error Body: ${text.substring(0, 200)}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

testPollinations();
