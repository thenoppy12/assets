const username = "thenoppy12";
const repo = "assets";
const branch = "files";
let baseUrl = `https://api.github.com/repos/${username}/${repo}/contents/`;
let history = [];

/*
sorry for bad english
COPYRIGHT BY THENOPPY12 (CONTAIN AI-GENERATED CONTENT)
i want this page like apache2.4 list file when folder not contain index.* file
but yeah u know github-pages isnt apache2.4 so i did this sech
hope u know me :)
*/


function getFileList(path) {
    const url = `${baseUrl}${path}?ref=${branch}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = ""; // clear previous list
            if (history.length > 0) {
                const backLink = document.getElementById("backLink");
                backLink.style.display = "inline"; // show back button

            } else {
                const backLink = document.getElementById("backLink");
                backLink.style.display = "none"; // hide back link if at root
            }
            data.forEach(item => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.textContent = item.name;
                if (item.type === "file") {
                    link.href = `https://github.com/${username}/${repo}/blob/${branch}/${item.path}?raw=true`;
                    link.target = "_blank"; // open in new tab
                } else {
                    link.href = "#";
                    link.onclick = () => {
                        history.push(path); // save current path to history
                        getFileList(item.path);
                    };
                }
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error:", error));
}

function goBack() {
    if (history.length > 0) {
        const previousPath = history.pop(); // get previous path
        getFileList(previousPath);
    }
}

getFileList("");

