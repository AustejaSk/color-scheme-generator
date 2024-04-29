const colorInput = document.getElementById("color-input")

document.getElementById("get-scheme-btn").addEventListener("click", function(){
    renderColors()
})
 
 function renderColors() {
     const selectedColor = colorInput.value.substring(1)
     const selectedMenuItem = document.getElementById("select-menu").value.toLowerCase()
     
     document.getElementById("color-1-container").style.backgroundColor = "#" + selectedColor
     document.getElementById("hex-code-color-1").textContent = "#" + selectedColor.toUpperCase()
     
     
     fetch(`"https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMenuItem}&count=4"`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(function(color, index) {
                
                const colorContainerId = "color-" + (index + 2) + "-container"
                
                document.getElementById(colorContainerId).style.backgroundColor = color.hex.value
                
                const hexCodeColorId = "hex-code-color-" + (index + 2)
                
                const hexCodeElement = document.getElementById(hexCodeColorId)
                
                hexCodeElement.textContent = color.hex.value
                
                hexCodeElement.addEventListener("click", function(){
                    copyToClipboard(color.hex.value)
                })
        })
    })
 }
 
 
// Copy to clipboard when clicking on color containers // 
 
const colorContainers = document.querySelectorAll(".color-container")

colorContainers.forEach(container => {
    container.addEventListener("click", function(){
        const hexCode = this.nextElementSibling.textContent
        copyToClipboard(hexCode)
    })
}) 



function copyToClipboard(text){
    const textarea = document.createElement("textarea")
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    
    // Add message to indicate copy success
    
    const message = document.createElement('div');
    message.textContent = 'Copied to clipboard!';
    message.classList.add('copy-message')
    document.body.appendChild(message);

    // Remove the message after 1 second
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 1000);
}