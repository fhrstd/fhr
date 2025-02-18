// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Use an async function to retrieve data
async function fetchAnimations() {
  // Fetch data from the Supabase database
  const { data: animations, error } = await supabase
    .from('animations')
    .select('target_id, gif_url, name');

  // Check if there was an error fetching the data
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

   // Find the <a-assets> container inside the <a-scene>
  const assetsContainer = document.querySelector('#assets-container');
   // Loop through the retrieved data and create <img> tags inside the <a-assets> tag
  animations.forEach(item => {
    const assetItem = document.createElement('a-asset-item');
    assetItem.setAttribute('id', item.name);   // Set 'id' to the animation's name
    assetItem.setAttribute('src', `${item.gif_url} </a-asset-item>`);  // Set 'src' to the gif_url
    // Append each <img> tag to the <a-assets> tag
    assetsContainer.appendChild(assetItem);
  });
  
  const entityContainer = document.querySelector('#entity-container');

    animations.forEach(elm => {  
    // Create outer entity with mindar-image-target
    const targetEntity = document.createElement('a-entity');
    targetEntity.setAttribute('mindar-image-target', 'targetIndex', elm.target_id);
    
    // Create inner entity with the GIF
    const gifEntity = document.createElement('a-entity');
    gifEntity.setAttribute('material', `shader: gif; src: #${elm.name}`);
    gifEntity.setAttribute('geometry', 'primitive: plane; width: 1; height: 1');
    gifEntity.setAttribute('position', '0 -0.25 0');
    gifEntity.setAttribute('rotation', '0 0 0');
    gifEntity.setAttribute('scale', '0.05 0.05 0.05');
    
    // Nest gif entity inside target entity
    targetEntity.appendChild(gifEntity);
    
    // Add to container
    entityContainer.appendChild(targetEntity);
});
  
  console.log(assetsContainer.innerHTML);
}

// Call the function to load the data and update the DOM
fetchAnimations();

