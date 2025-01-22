// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Use an async function to retrieve data
async function fetchAnimations() {
  // Fetch data from the Supabase table 'animations'
  const { data: animations, error } = await supabase
    .from('animations')
    .select('target_id, gif_url, name');

  // Check for errors
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  // Find the container element where assets will be appended
  const assetsContainer = document.getElementById('img-container');

  // Loop through the fetched animations data and generate <a-assets> tags
  animations.forEach(item => {
    const imgTag = document.createElement('img');
    
    // Set attributes for the <img> tag
    imgTag.setAttribute('name', item.name);    // Use 'name' for the name
    imgTag.setAttribute('src', item.gif_url); // Use 'gif_url' for the source

    // Append the <img> tag to the <a-assets> tag
    //aAssetsTag.appendChild(imgTag);

    // Append the <img> tag to the container
    assetsContainer.appendChild(imgTag);
  });
}

// Call the fetchAnimations function to load the assets dynamically
fetchAnimations();

