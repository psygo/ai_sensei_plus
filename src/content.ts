//----------------------------------------------------------
// 1. Setup

setInterval(() => {
  clearIcons()

  addStatisticsContainer()
  addGameStatistics()
}, 10)

//----------------------------------------------------------
// 2. Clear Nav Icons

function navIcons() {
  const icons =
    document.body.querySelectorAll<HTMLSpanElement>(
      "div.nav-row-icon > span"
    )

  return [...icons]
}

function checkNavIconsData() {
  const icons = navIcons()

  return icons.length > 0
    ? [...icons].map((icon) => icon.dataset).some((d) => d)
    : false
}

function clearIcons() {
  if (checkNavIconsData()) {
    const icons = navIcons()

    icons.forEach((icon) => (icon.dataset.highlight = ""))
  }
}

//----------------------------------------------------------
// 3. Add Game Statistics

function addStatisticsContainer() {
  if (getStatisticsContainer()) return

  const graphContainerParent =
    document.querySelector<HTMLDivElement>(
      "#info-wrapper > div"
    )
  const graphContainer =
    document.querySelector<HTMLDivElement>(
      "#info-wrapper > div > div.card.not-first"
    )

  const statisticsContainer = document.createElement("div")
  statisticsContainer.id = "statistics-container"
  // Styling
  statisticsContainer.style.padding = "10px"
  statisticsContainer.style.display = "flex"
  statisticsContainer.style.justifyContent = "center"

  graphContainerParent?.insertBefore(
    statisticsContainer,
    graphContainer
  )
}

function getGraphDiv() {
  return document.body.querySelector<HTMLDivElement>(
    "div#score-graph "
  )
}

function getGameGraph() {
  return getGraphDiv()?.querySelector("svg")
}

type GameData = {
  blackMistakesTotal: number
  whiteMistakesTotal: number
  blackMistakesNormalTotal: number
  whiteMistakesNormalTotal: number
  blackMistakesBlunderTotal: number
  whiteMistakesBlunderTotal: number
}

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(s: string) {
  const parenthesesRegexp = /\(([^)]+)\)/

  const [r, g, b] = parenthesesRegexp
    .exec(s)![1]
    .replaceAll(" ", "")
    .split(",")
    .map((n) => parseInt(n))

  return (
    "#" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b)
  )
}

function getGameData() {
  const gameGraph = getGameGraph()

  if (gameGraph) {
    const allGroups = gameGraph.querySelectorAll("g")

    const mistakesGroup = allGroups[allGroups.length - 1]
    const mistakes = [
      ...mistakesGroup.querySelectorAll("circle"),
    ]

    const blackMistakes = mistakes.filter((m) =>
      [...m.classList].includes("black")
    )
    const whiteMistakes = mistakes.filter((m) =>
      [...m.classList].includes("white")
    )

    const root = document.documentElement
    const rootStyle = getComputedStyle(root)
    const mistakeColors = [
      "#cf715e",
      rootStyle.getPropertyValue("--mistake"),
      rootStyle.getPropertyValue("--mistake-on-black"),
      rootStyle.getPropertyValue("--mistake-on-white"),
    ]
    const blunderColors = [
      rootStyle.getPropertyValue("--blunder"),
      rootStyle.getPropertyValue("--blunder-on-black"),
      rootStyle.getPropertyValue("--blunder-on-white"),
    ]

    const blackMistakesNormal = blackMistakes.filter((m) =>
      mistakeColors.includes(
        rgbToHex(getComputedStyle(m).fill)
      )
    )
    const whiteMistakesNormal = whiteMistakes.filter((m) =>
      mistakeColors.includes(
        rgbToHex(getComputedStyle(m).fill)
      )
    )
    const blackMistakesBlunder = blackMistakes.filter((m) =>
      blunderColors.includes(
        rgbToHex(getComputedStyle(m).fill)
      )
    )
    const whiteMistakesBlunder = whiteMistakes.filter((m) =>
      blunderColors.includes(
        rgbToHex(getComputedStyle(m).fill)
      )
    )

    return <GameData>{
      blackMistakesTotal: blackMistakes.length,
      whiteMistakesTotal: whiteMistakes.length,
      blackMistakesNormalTotal: blackMistakesNormal.length,
      whiteMistakesNormalTotal: whiteMistakesNormal.length,
      blackMistakesBlunderTotal:
        blackMistakesBlunder.length,
      whiteMistakesBlunderTotal:
        whiteMistakesBlunder.length,
    }
  }
}

function getStatisticsContainer() {
  return document.body.querySelector(
    "#statistics-container"
  )
}

function addGameStatistics() {
  const statisticsContainer = getStatisticsContainer()
  const gameData = getGameData()

  if (
    statisticsContainer &&
    !statisticsContainer.innerHTML &&
    gameData
  ) {
    statisticsContainer.innerHTML = /* html */ `
      <style>
        td, th {
          padding-left: 10px;
          text-align: center;
        }
      </style>

      <table>
        <thead>
          <tr>
            <th colspan="4">Total Mistakes</th>
          </tr>
          <tr>
            <th>Color</th>
            <th>Total</th>
            <th>Normal</th>
            <th>Blunder</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Black</td>
            <td>${gameData.blackMistakesTotal}</td>
            <td>${gameData.blackMistakesNormalTotal}</td>
            <td>${gameData.blackMistakesBlunderTotal}</td>
          </tr>
          <tr>
            <td>White</td>
            <td>${gameData.whiteMistakesTotal}</td>
            <td>${gameData.whiteMistakesNormalTotal}</td>
            <td>${gameData.whiteMistakesBlunderTotal}</td>
          </tr>
        </tbody>
      </table>
    `
  }
}

//----------------------------------------------------------
// 3. Collapse SVG Boards

// I thought the infinite scroll crashing was due to them
// implementing gobans with SVGs instead of `<canvas>`es.
// But now I'm not sure.
function collapseSvgBoards() {
  const backgroundDivs =
    document.body.querySelectorAll<HTMLDivElement>(
      "div.board-background"
    )

  backgroundDivs.forEach((backgroundDiv) => {
    if (backgroundDiv) {
      backgroundDiv.innerHTML = ""
      backgroundDiv.style.height = "379px"
      backgroundDiv.style.width = "379px"
    }
  })
}

//----------------------------------------------------------
