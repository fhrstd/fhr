// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to fetch animations and create assets
async function loadAnimationAssets() {
    try {
        // Fetch animations from Supabase
        const { data: animations, error } = await supabase
            .from('animations')
            .select('target_id, gif_url, name')

        if (error) throw error

        // Get the a-assets element
        const assets = document.querySelector('a-assets')

        // Generate img tags for each animation
        animations.forEach(animation => {
            const img = document.createElement('img')
            img.id = animation.target_id
            img.src = animation.gif_url
            img.setAttribute('crossorigin', 'anonymous')
            // You can also store the name as a data attribute if needed
            img.dataset.name = animation.name
            assets.appendChild(img)
        })

        // Optional: Log when all assets are loaded
        assets.addEventListener('loaded', () => {
            console.log('All animation assets loaded')
        })

    } catch (error) {
        console.error('Error loading animations:', error)
    }
}
