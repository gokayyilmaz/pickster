async function handleClick() {
  const val1 = document.getElementById("input1").value;
  const val2 = document.getElementById("input2").value;
  const val3 = document.getElementById("input3").value;
  const loader = document.getElementById("loader");
  const button = document.querySelector("button");

  if (!val1 || !val2 || !val3) {
    alert("Please fill in all three movie fields.");
    return;
  }

  const prompt = `I watched these three movies and loved them: ${val1}, ${val2}, ${val3}. Can you recommend a similar movie that I would definitely enjoy? Just include the movie title and year in your answer.`;

  try {
    // Disable button and show loader
    button.disabled = true;
    loader.classList.remove("hidden");

    const resultText = await window.electronAPI.invokeGemini(prompt);
    alert(`pickster. recommends:\n\n${resultText}`);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    alert("An error occurred while fetching the recommendation.");
  } finally {
    // Re-enable button and hide loader
    button.disabled = false;
    loader.classList.add("hidden");
  }
}
