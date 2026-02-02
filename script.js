// DOM elements
const searchInput = document.getElementById("mapInput");
const mapList = document.getElementById("mapButtons");
const resultImage = document.getElementById("mapImage");
const statusText = document.getElementById("mapStatus");
const previewPanel = document.querySelector(".mapsPreview");

// Map names + images
const mapImages = {
  "dry season": "images/dry-season.png",
  "hideout": "images/hideout.png",
  "layer cake": "images/layer-cake.png",
  "shooting star": "images/shooting-star.png",
  "center stage": "images/center-stage.png",
  "pinball dreams": "images/pinball-dreams.png",
  "sneaky fields": "images/sneaky-fields.png",
  "triple dribble": "images/triple-dribble.png",
  "double swoosh": "images/double-swoosh.png",
  "gem fort": "images/gem-fort.png",
  "hard rock mine": "images/hard-rock-mine.png",
  "undermine": "images/undermine.png",
  "hot potato": "images/hot-potato.png",
  "kaboom canyon": "images/kaboom-canyon.png",
  "pit stop": "images/pit-stop.png",
  "safe zone": "images/safe-zone.png",
  "safer zone": "images/safer-zone.png",
  "bridge too far": "images/bridge-too-far.png",
  "dueling beetles": "images/dueling-beetles.png",
  "open business": "images/open-business.png",
  "parallel plays": "images/parallel-plays.png",
  "ring of fire": "images/ring-of-fire.png",
  "belles rock": "images/belles-rock.png",
  "flaring phoenix": "images/flaring-phoenix.png",
  "new horizons": "images/new-horizons.png",
  "out in the open": "images/out-in-the-open.png"
};

const mapModes = {
  "dry season": "knockball",
  "hideout": "knockball",
  "layer cake": "knockball",
  "center stage": "knockball",
  "pinball dreams": "knockball",
  "sneaky fields": "knockball",
  "triple dribble": "knockball",
  "double swoosh": "gemgrab",
  "gem fort": "gemgrab",
  "hard rock mine": "gemgrab",
  "undermine": "gemgrab",
  "shooting star": "knockout",
  "bridge too far": "knockout",
  "dueling beetles": "knockout",
  "open business": "knockout",
  "parallel plays": "knockout",
  "ring of fire": "knockout",
  "belles rock": "knockout",
  "flaring phoenix": "knockout",
  "new horizons": "knockout",
  "out in the open": "knockout",
  "hot potato": "heist",
  "kaboom canyon": "heist",
  "pit stop": "heist",
  "safe zone": "heist",
  "safer zone": "heist"
};

// Helper functions
function cleanText(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

function toTitle(text) {
  return text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function setPreviewMode(mode) {
  previewPanel.classList.remove("mode-knockball", "mode-gemgrab", "mode-knockout", "mode-heist");
  if (mode) previewPanel.classList.add("mode-" + mode);
}

// Show map in preview
function showMap(mapName) {
  const key = cleanText(mapName);

  // Active highlight sidebar
  document.querySelectorAll(".map-item").forEach(item => {
    item.classList.toggle("active", item.dataset.map === key);
  });

  if (mapImages[key]) {
    setPreviewMode(mapModes[key]);
    resultImage.src = mapImages[key];
    resultImage.style.display = "block";
    statusText.textContent = `Selected: ${toTitle(key)}`;
  } else {
    setPreviewMode(null);
    resultImage.style.display = "none";
    statusText.textContent = "Map not found.";
  }
}

// Render sidebar
function renderList(filter = "") {
  mapList.innerHTML = "";

  Object.keys(mapImages)
    .sort()
    .forEach(key => {
      if (!key.includes(filter)) return;

      const div = document.createElement("div");
      div.className = "map-item";
      div.textContent = toTitle(key);
      div.dataset.map = key;

      div.addEventListener("click", () => showMap(key));

      mapList.appendChild(div);
    });
}

// Filter while typing
searchInput.addEventListener("input", () => {
  const filter = cleanText(searchInput.value);
  renderList(filter);
});

// Initial load
renderList();
statusText.textContent = "Choose a map";


