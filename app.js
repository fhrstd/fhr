// Initialize Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://fdphjxbjnononpxljrgb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcGhqeGJqbm9ub25weGxqcmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxOTM1MzMsImV4cCI6MjA1Mjc2OTUzM30.4OAWrb2IOvq0lOOPplBzG-hGYrK5BfP-y9sCR4ac3Vc'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Register custom A-Frame component
AFRAME.registerComponent('gif-handler', {
    init: function() {
        const loadingEl = document.querySelector('#loading');
        const errorEl = document.querySelector('#error');
        
        // Hide loading indicator initially
        if (loadingEl) loadingEl.classList.add('hidden');
        
        this.el.addEventListener('targetFound', async () => {
            try {
                // Show loading indicator
                if (loadingEl) loadingEl.classList.remove('hidden');
                if (errorEl) errorEl.classList.add('hidden');
                
                const targetId = this.el.getAttribute('mindar-image-target').targetIndex;
                console.log('Target found:', targetId); // Debug log
                
                const { data, error } = await supabase
                    .from('animations')
                    .select('gif_url')
                    .eq('target_id', targetId)
                    .single();

                if (error) {
                    console.error('Supabase error:', error); // Debug log
                    throw error;
                }

                if (data) {
                    console.log('GIF URL:', data.gif_url); // Debug log
                    const planeEl = this.el.querySelector('a-plane');
                    
                    // Preload the GIF
                    const img = new Image();
                    img.onload = () => {
                        planeEl.setAttribute('material', {
                            shader: 'gif',
                            src: data.gif_url,
                            //transparent: true,
                            opacity: 1
                        });
                        if (loadingEl) loadingEl.classList.add('hidden');
                    };
                    img.src = data.gif_url;
                }
            } catch (error) {
                console.error('Error:', error);
                if (errorEl) errorEl.classList.remove('hidden');
            } finally {
                if (loadingEl) loadingEl.classList.add('hidden');
            }
        });

        this.el.addEventListener('targetLost', () => {
            if (errorEl) errorEl.classList.add('hidden');
            const planeEl = this.el.querySelector('a-plane');
            planeEl.setAttribute('material', {
                shader: 'gif',
                src: '',
                //transparent: true,
                opacity: 0
            });
        });
    }
});
