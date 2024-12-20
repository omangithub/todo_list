
const blurBackground = (function () {
    const computedStyle = window.getComputedStyle(leftSideColumn);
    const height = parseInt(computedStyle.getPropertyValue("height").replace("px","")) + 40 + "px";
    const background = document.getElementById("body");

    const blurBackgroundContainer = document.createElement("div");
    blurBackgroundContainer.id="blurBackground";
    blurBackgroundContainer.style.height=height;
    blurBackgroundContainer.style.position="absolute";
    blurBackgroundContainer.style.top = "0%";
    blurBackgroundContainer.style.left= "0%";
    background.appendChild(blurBackgroundContainer);
});

export {blurBackground}