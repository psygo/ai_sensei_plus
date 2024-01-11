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

    return <GameData>{
      blackMistakesTotal: blackMistakes.length,
      whiteMistakesTotal: whiteMistakes.length,
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
      <table>
        <thead>
          <tr>
            <th colspan="2">Total Mistakes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Black</td>
            <td>${gameData.blackMistakesTotal}</td>
          </tr>
          <tr>
            <td>White</td>
            <td>${gameData.whiteMistakesTotal}</td>
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
