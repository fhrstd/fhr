// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fetchAnimations() {
  // Fetch data from Supabase
  const { data: animations, error } = await supabase
    .from('animations')
    .select('target_id, gif_url, name');

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const assetsContainer = document.querySelector('#assets-container');
  const entityContainer = document.querySelector('#entity-container');

  // Load assets
  animations.forEach(item => {
    const assetItem = document.createElement('img');
    assetItem.setAttribute('id', item.name);
    assetItem.setAttribute('src', item.gif_url);
    assetsContainer.appendChild(assetItem);
  });

  console.log("Assets Loaded:", assetsContainer.innerHTML); // Debugging assets

  // Create MindAR entities
  animations.forEach((elm) => {  
    console.log(`Creating entity for ${elm.name} with target ID: ${elm.target_id}`); // Debugging

    const target = document.createElement('a-entity');
    const entityId = `gif-${elm.name}`; // Unique ID for each GIF entity

    target.innerHTML = `
      <a-entity mindar-image-target="targetIndex: ${elm.target_id}">
        <a-entity 
          id="${entityId}"
          material="shader: gif; src: #${elm.name}" 
          geometry="primitive: plane; width: 1; height: 1.4"
          position="0 0 0.01"  
        ></a-entity>
      </a-entity>
    `;

    entityContainer.appendChild(target);

    // Reset GIF animation after a short delay
    setTimeout(() => resetGif(entityId, `#${elm.name}`), 500);
  });

  console.log("Entities added:", entityContainer.innerHTML); // Debugging entities
}

// Function to reset GIF animation
function resetGif(entityId, gifUrl) {
  const gifEntity = document.querySelector(`#${entityId}`);
  if (gifEntity) {
    gifEntity.setAttribute("material", "shader: gif; src: ''"); // Clear src
    setTimeout(() => {
      gifEntity.setAttribute("material", `shader: gif; src: ${gifUrl}`);
    }, 100); // Small delay before reloading
  }
}

// Call the function to load the data and update the DOM
fetchAnimations();
