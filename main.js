let range = document.querySelector(".range");
let slider = document.querySelector(".range .slider");
let rangeBG = document.querySelector(".range .background");
// ******
let checkbox = document.querySelector(".checkbox");
let checkboxCircle = document.querySelector(".checkbox .circle");
// ******
let pages = document.getElementById("pages");
let price = document.getElementById("price");
// ******
let prices = [8, 12, 16, 24, 36] // e.g. 8$ per month
let pricesDiscount = [];
prices.map(p => {pricesDiscount.push(p - p * 25 / 100)});
let PlansBenefits = [10, 50, 100, 500, 1000] // e.g. 10k pageviews
let planNumber = 2;
let yearlyPlan = false;
// ******
function moveSlider(e) {
    let availableWidth = range.getBoundingClientRect().width - slider.getBoundingClientRect().width
    let minLeft = 0;
    let parts = 4;
    let divide = (availableWidth) / parts // I couldn't come up with a good name
    let left = Math.round((e.x - range.getBoundingClientRect().x - slider.getBoundingClientRect().width / 2) / divide) * divide;
    let maxLeft = availableWidth;
    let finalLeft = Math.round(Math.max(minLeft, Math.min(left, maxLeft)))
    slider.style.left = `${finalLeft}px`
    rangeBG.style.width = `${finalLeft + 20}px`
    planNumber = Math.round((finalLeft / availableWidth) * parts)
    if (!yearlyPlan) {
        PlansBenefits[planNumber] >= 1000 ? pages.textContent = `${PlansBenefits[planNumber] / 1000}m` : pages.textContent = `${PlansBenefits[planNumber]}k`;
        price.textContent = prices[planNumber]
    } else {
        PlansBenefits[planNumber] >= 1000 ? pages.textContent = `${PlansBenefits[planNumber] / 1000}m` : pages.textContent = `${PlansBenefits[planNumber]}k`;
        price.textContent = pricesDiscount[planNumber]
    }
}
// ******
range.addEventListener("mousedown", _ => {
    document.body.style.cssText = "user-select: none; cursor: grabbing;"
    document.addEventListener("mousemove", moveSlider);
    document.addEventListener("mouseup", _ => {
        document.removeEventListener("mousemove", moveSlider);
        document.body.style.cssText = "user-select: auto; cursor: auto;"
    })
})
// ******
checkbox.addEventListener("click", _ => {
    if (yearlyPlan) {
        price.textContent = prices[planNumber]
        checkboxCircle.classList.remove("selected");
        checkbox.classList.remove("selected");
        yearlyPlan = false;
    } else {
        price.textContent = pricesDiscount[planNumber]
        checkboxCircle.classList.add("selected");
        checkbox.classList.add("selected");
        yearlyPlan = true;
    }
})

