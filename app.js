// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
//const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co';
//const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc';
//const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Register custom A-Frame component
AFRAME.registerComponent('gif-handler', {
        init: function() {
          this.el.addEventListener('targetFound', async () => {
            try {
              const targetId = this.el.getAttribute('mindar-image-target').targetIndex;
              
              const { data, error } = await supabase
                .from('animations')  // Your table name here
                .select('gif_url')
                .eq('target_id', targetId)
                .single();

              if (error) throw error;

              if (data) {
                // Create HTML element for GIF
                const gifEl = document.createElement('img');
                gifEl.src = data.gif_url;
                gifEl.style.display = 'none';
                document.body.appendChild(gifEl);

                // Get the plane element and update its material
                const planeEl = this.el.querySelector('a-plane');
                planeEl.setAttribute('material', {
                  src: gifEl,
                  transparent: true,
                  alphaTest: 0.5
                });
              }
            } catch (error) {
              console.error('Error fetching GIF:', error);
            }
          });

          this.el.addEventListener('targetLost', () => {
            // Optional: Handle what happens when target is lost
            const planeEl = this.el.querySelector('a-plane');
            planeEl.setAttribute('material', {
              src: '',
              transparent: true,
              alphaTest: 0.5
            });
          });
        }
      });
