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
  // Create the target entity
    const target = document.createElement('a-entity');
    //target.setAttribute('mindar-image-target', `targetIndex`, elm.target_id);  // Fixed attribute syntax

    var i = 0;
    // Create nested GIF entity inside target
    target.innerHTML = `
      <a-entity mindar-image-target="targetIndex: ${i++}">
      <a-entity 
            material="shader: gif; src: #${elm.name}"
            geometry="primitive: plane; width: 1; height: 1"
            position="0 0 0"
       ></a-entity>
       </a-entity>
   `;
    
    // Append the target to the container
   entityContainer.appendChild(target);
});
  
  console.log(assetsContainer.innerHTML);
}

// Call the function to load the data and update the DOM
fetchAnimations();
