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
    const imgTag = document.createElement('img');
    imgTag.setAttribute('id', item.name);   // Set 'id' to the animation's name
    imgTag.setAttribute('src', item.gif_url);  // Set 'src' to the gif_url

    // Append each <img> tag to the <a-assets> tag
    assetsContainer.appendChild(imgTag);
  // Now dynamically set the material of the box using the loaded asset
      const box = document.querySelector('#box1');
      box.setAttribute('material', `shader:gif;src: #${item.name}`);
  });
  // Log the final HTML structure of <a-assets> to the console
  console.log(assetsContainer.innerHTML);
}

// Call the function to load the data and update the DOM
fetchAnimations();

// Use an async function to retrieve data
async function fetchBackground() {
  // Fetch data from the Supabase database
  const { data: background, error } = await supabase
    .from('background')
    .select('target_id, gif_url, name');

  // Check if there was an error fetching the data
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  // Find the <a-assets> container inside the <a-scene>
  const assetsContainer = document.querySelector('#assets-container2');

  // Loop through the retrieved data and create <img> tags inside the <a-assets> tag
  background.forEach(item => {
    const imgTag = document.createElement('img');
    imgTag.setAttribute('id', item.name);   // Set 'id' to the animation's name
    imgTag.setAttribute('src', item.gif_url);  // Set 'src' to the gif_url

    // Append each <img> tag to the <a-assets> tag
    assetsContainer.appendChild(imgTag);
  // Now dynamically set the material of the box using the loaded asset
      const bok = document.querySelector('#bok1');
      bok.setAttribute('material', `src: #${item.name}`);
  });
  // Log the final HTML structure of <a-assets> to the console
  console.log(assetsContainer.innerHTML);
}

// Call the function to load the data and update the DOM
fetchBackground();
