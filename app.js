// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Register custom A-Frame component
AFRAME.registerComponent('gif-handler', {
    init: function() {
        // Hide loading indicator initially
        document.querySelector('#loading').classList.add('hidden');
        
        this.el.addEventListener('targetFound', async () => {
            try {
                // Show loading indicator
                document.querySelector('#loading').classList.remove('hidden');
                document.querySelector('#error').classList.add('hidden');
                
                const targetId = this.el.getAttribute('mindar-image-target').targetIndex;
                
                // Query Supabase
                const { data, error } = await supabase
                    .from('animations')
                    .select('gif_url')
                    .eq('target_id', targetId)
                    .single();

                if (error) throw error;

                if (data) {
                    const planeEl = this.el.querySelector('a-plane');
                    planeEl.setAttribute('material', {
                        src: data.gif_url,
                        transparent: true
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                document.querySelector('#error').classList.remove('hidden');
            } finally {
                document.querySelector('#loading').classList.add('hidden');
            }
        });

        this.el.addEventListener('targetLost', () => {
            // Optional: Handle what happens when target is lost
            document.querySelector('#error').classList.add('hidden');
        });
    }
});
