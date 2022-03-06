// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        let input = document.createElement("textarea");
        input.name = 'gutter';
        input.id = 'gutter';
        input.maxLength = "5000";
        input.cols = "80";
        input.rows = "40";
        input.value = document.body.innerHTML;
        document.body.append(input);
        document.body.style.backgroundColor = color;
    });
}