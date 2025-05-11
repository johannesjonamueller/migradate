import streamlit as st
import base64
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import numpy as np

# Function to create placeholder images
def get_placeholder_image(width=400, height=300, text="Image Placeholder", color="#0069b4"):
    fig, ax = plt.subplots(figsize=(width/100, height/100))
    ax.set_facecolor('#f0f7ff')
    ax.text(0.5, 0.5, text, fontsize=18, ha='center', va='center', color=color, wrap=True)
    ax.axis('off')
    
    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight', pad_inches=0.1)
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode()
    plt.close(fig)
    
    return f"data:image/png;base64,{img_str}"

def main():
    st.set_page_config(layout="wide", page_title="MigraDate Pitch", initial_sidebar_state="collapsed")
    
    # Custom CSS for mobile-optimized Tinder-like interface
    st.markdown("""
    <style>
        /* Overall styling */
        .main { padding: 0; max-width: 100%; }
        
        /* Profile card styling */
        .profile-card {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            margin: 20px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative;
            width: 90%;
            max-width: 600px;
            overflow: hidden;
            font-family: 'Helvetica', 'Arial', sans-serif;
        }
        
        /* Profile image styling */
        .profile-image {
            width: 100%;
            border-radius: 10px;
            object-fit: cover;
            margin-bottom: 15px;
        }
        
        /* Profile header styling */
        .profile-header {
            display: flex;
            align-items: baseline;
            margin-bottom: 10px;
        }
        
        .profile-name {
            font-size: 24px;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .profile-age {
            font-size: 22px;
            color: #555;
        }
        
        /* Profile bio styling */
        .profile-bio {
            font-size: 16px;
            margin-top: 10px;
            border-top: 1px solid #eee;
            padding-top: 15px;
            white-space: pre-line;
        }
        
        /* Swipe buttons */
        .swipe-buttons {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 20px;
        }
        
        .swipe-button {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .dislike-button {
            background-color: #fd5068;
        }
        
        .like-button {
            background-color: #1be4a1;
        }
        
        /* Progress indicator */
        .progress-indicator {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 15px;
        }
        
        .progress-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ddd;
        }
        
        .active-dot {
            background-color: #0069b4;
        }
        
        /* It's a match overlay */
        .match-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            color: white;
            font-size: 36px;
            font-weight: bold;
        }
        
        /* Hide default Streamlit elements */
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
    </style>
    """, unsafe_allow_html=True)
    
    # Profile data with enhanced bio information
    profiles = [
        {
            "name": "Aging Workforce",
            "age": "72",
            "image": get_placeholder_image(text="Elderly couple looking concerned"),
            "bio": """Getting older by the day 👴👵 and desperately seeking fresh talent.

- Shrinking by 6 million working-age people by 2040
- 28.3% of companies can't find qualified workers
- Service providers (35.1%) and legal/tax firms (75%) hit hardest
- Skilled worker shortage costs €70 billion annually in productivity"""
        },
        {
            "name": "Economic Growth",
            "age": "43",
            "image": get_placeholder_image(text="Factory with empty workstations"),
            "bio": """Currently losing serious money due to workforce shortages 📉

- €40 billion annual economic impact from worker shortage
- Critical infrastructure gaps emerging in key sectors
- Need 300,000+ skilled workers annually (only getting 200,000)
- Heavy impact on manufacturing (23%) and healthcare sectors"""
        },
        {
            "name": "Fax-Loving Bureaucracy",
            "age": "67",
            "image": get_placeholder_image(text="Stack of paperwork and fax machine"),
            "bio": """Old-fashioned type who loves paperwork 📠📋 Not great with technology.

- Application processing takes 6+ months on average
- 40% abandonment rate on skilled worker applications
- 7 disconnected systems for verification
- 35% error rate in documentation processing
- €2,000+ costs for credential translations"""
        },
        {
            "name": "Katharina Reiche",
            "age": "Minister",
            "image": get_placeholder_image(text="Professional photo of Katharina Reiche"),
            "bio": """Looking for innovative solutions to Germany's workforce crisis 💼

- Supporter of digital transformation in public administration
- Implementing Fachkräfteeinwanderungsgesetz (Skilled Immigration Act)
- Need tech solutions to process more than 200,000 visas annually
- Focused on economic growth through talent acquisition"""
        },
        {
            "name": "The Competition Crew",
            "age": "Various",
            "image": get_placeholder_image(text="LinkedIn, Indeed, StepStone, Xing, Monster logos"),
            "bio": """Good at matching jobs within countries but lacking on international stage 🔄

- LinkedIn: Premium costs deter users, auto-archiving of non-EU candidates
- Indeed: Overwhelming for niche seekers, limited filters
- StepStone: High costs for small firms, minimal migrant support
- Xing: Small international job pool, complex for non-networkers
- Monster: Generic experience, weak migrant integration"""
        },
        # Continued profiles...
        {
            "name": "Make it in Germany",
            "age": "3",
            "image": get_placeholder_image(text="Make it in Germany Logo"),
            "bio": """Government's first attempt at matchmaking 🇩🇪 but not user-friendly enough.

- Overly focused on documentation before connections
- Requires extensive paperwork upfront
- Limited interaction between employers and candidates
- Missing gamification elements to increase engagement
- Platform is process-driven rather than human-centered"""
        },
        {
            "name": "MigraDate",
            "age": "25",
            "image": get_placeholder_image(text="MigraDate App Logo and Interface", color="#ff4d79"),
            "bio": """Human connections first, paperwork later 🤝 Making migration fun!

- AI-powered skill-based matching (not just credentials)
- 65% faster hiring process than traditional methods
- 30% higher match quality leading to better retention
- Gamified skill verification through interactive challenges
- Direct messaging/video calls before bureaucracy begins
- Integrated with government systems for visa tracking"""
        },
        {
            "name": "Jamal",
            "age": "28",
            "image": get_placeholder_image(text="Young professional man from India"),
            "bio": """Qualified care worker currently in Albania 🏥 Seeking German opportunity.

- Dual medical degree but struggling with credential recognition
- 8-month wait for qualification verification
- Spent €2,000+ on document translations
- Abandoned three German applications due to complexity
- Needs practical demonstrations over paperwork"""
        },
        {
            "name": "Maria",
            "age": "31",
            "image": get_placeholder_image(text="Tech professional woman from Colombia"),
            "bio": """Tech specialist with MBA from US 💻 Looking for German opportunity.

- Software development expertise with 5+ years experience
- Application abandonment after 40+ hours spent on hiring process
- Can't evaluate her own foreign qualifications against German standards
- No visibility into application status after submission
- Needs direct connection with potential employers"""
        },
        {
            "name": "TechSolutions GmbH",
            "age": "SME",
            "image": get_placeholder_image(text="Modern office with empty desks"),
            "bio": """Growing tech company in Munich desperate for talent 🔍

- 40+ hours spent per international hire attempt
- 70% application abandonment rate from international candidates
- Limited global reach for talent acquisition
- Can't effectively evaluate foreign qualifications
- No resources for managing complex visa processes"""
        },
        {
            "name": "Market Opportunity",
            "age": "€40B",
            "image": get_placeholder_image(text="TAM/SAM/SOM Chart"),
            "bio": """Huge potential for the right partner 📊 Validated market need.

- TAM: €40 billion (Germany skilled worker recruitment market)
- SAM: €4 billion (10% focused on international recruitment)
- SOM: €400 million (initial target for first 5 years)
- 100,000+ annual skilled worker gap to fill
- Customer discovery with 15 HR managers, 22 workers, 8 officials"""
        },
        {
            "name": "Revenue Streams",
            "age": "€€€",
            "image": get_placeholder_image(text="Multiple Revenue Streams Visualization"),
            "bio": """Multiple ways to make this relationship profitable 💰

- Employers: Freemium for 10 postings, €150/additional posting
- Candidates: Basic (free), Premium €9.99/month
- Government: Integration fees and SaaS licenses
- Unit Economics: Employer CAC €35, LTV €450
- Candidate CAC €12, LTV €65
- Gross margin: 75%"""
        },
        {
            "name": "Market Entry Plan",
            "age": "24",
            "image": get_placeholder_image(text="Three-phase Roadmap"),
            "bio": """Three phases to market domination 🚀

- Phase 1: Government partnerships (Make-it-in-Germany integration)
- Phase 2: Source country outreach (Embassies, Außenhandelskammern)
- Phase 3: SME targeting in high-demand sectors
- Target countries: India, Philippines, Vietnam, Ukraine, Brazil
- Industry focus: Healthcare, IT, Engineering, Manufacturing"""
        },
        {
            "name": "Financial Projections",
            "age": "€1.8M",
            "image": get_placeholder_image(text="Growth Curve with Break-even Point"),
            "bio": """Looking for €150K investment for a serious relationship 📈

- Break-even point: 18-24 months
- Revenue projections: Y1 €300K, Y2 €750K, Y3 €1.8M
- Monthly burn rate: €25K with 18-month runway
- Target growth: 40% quarterly after launch
- Series A trigger: 5,000 successful matches
- Funding allocation: Platform €60K, Gov. integration €30K, GTM €40K, Team €20K"""
        },
        {
            "name": "Nima",
            "age": "Co-Founder",
            "image": get_placeholder_image(text="Professional photo of Nima"),
            "bio": """Data Scientist passionate about solving global challenges 🧠

- Data Scientist @ Welthungerhilfe
- AI/ML expertise in matching algorithms and NLP
- Deep experience in data analysis and pattern recognition
- Product design with focus on user experience
- Proven track record in building AI-powered solutions"""
        },
        {
            "name": "Johannes",
            "age": "Co-Founder",
            "image": get_placeholder_image(text="Professional photo of Johannes"),
            "bio": """GenAI Engineer with policy expertise 🤖🏛️

- GenAI Engineer @ Accenture
- Former policy advisor in German Bundestag
- General Manager at KlimaUnion
- Public sector knowledge and regulatory expertise
- Technical skills combined with policy understanding"""
        },
        {
            "name": "Perfect Match Investor",
            "age": "€150K",
            "image": get_placeholder_image(text="Investor with 'It's a Match!' overlay"),
            "bio": """Seeking innovative GovTech solutions with global impact 🌍

- €150K seed funding opportunity
- Strategic introductions to government stakeholders
- Industry partnerships in key sectors (Healthcare, IT, Manufacturing)
- HR tech knowledge and connections
- Support with international expansion and public sector procurement
- Perfect timing with new regulations and digital transformation"""
        }
    ]
    
    # State management for profile navigation
    if 'profile_index' not in st.session_state:
        st.session_state.profile_index = 0
    
    if 'show_match' not in st.session_state:
        st.session_state.show_match = False
    
    # Navigation functions
    def next_profile():
        if st.session_state.profile_index < len(profiles) - 1:
            st.session_state.profile_index += 1
            
            # Show match animation for the investor profile
            if st.session_state.profile_index == len(profiles) - 1:
                st.session_state.show_match = True
        st.rerun()
    
    def prev_profile():
        if st.session_state.profile_index > 0:
            st.session_state.profile_index -= 1
            st.session_state.show_match = False
        st.rerun()
    
    # Layout with centered profile card
    col1, col2, col3 = st.columns([1, 10, 1])
    
    with col2:
        current_profile = profiles[st.session_state.profile_index]
        
        # Display profile card
        st.markdown(f"""
        <div class="profile-card">
            <img src="{current_profile['image']}" class="profile-image">
            <div class="profile-header">
                <div class="profile-name">{current_profile['name']}</div>
                <div class="profile-age">, {current_profile['age']}</div>
            </div>
            <div class="profile-bio">{current_profile['bio']}</div>
        </div>
        """, unsafe_allow_html=True)
        
        # Navigation buttons
        col_dislike, col_like = st.columns([1, 1])
        
        with col_dislike:
            if st.button("👎 Dislike", key="dislike", use_container_width=True):
                prev_profile()
        
        with col_like:
            if st.button("👍 Like", key="like", use_container_width=True):
                next_profile()
        
        # Progress indicator
        progress_dots = ""
        for i in range(len(profiles)):
            if i == st.session_state.profile_index:
                progress_dots += '<span class="progress-dot active-dot"></span>'
            else:
                progress_dots += '<span class="progress-dot"></span>'
        
        st.markdown(f"""
        <div class="progress-indicator">
            {progress_dots}
        </div>
        """, unsafe_allow_html=True)
    
    # Show "It's a Match!" overlay when reaching the investor profile
    if st.session_state.show_match:
        st.markdown("""
        <div class="match-overlay">
            <div style="margin-bottom: 30px;">✨ IT'S A MATCH! ✨</div>
            <div style="font-size: 24px; margin-bottom: 40px;">You've found your perfect investor!</div>
            <div style="font-size: 18px;">Tap anywhere to continue</div>
        </div>
        
        <script>
            // This would typically dismiss the overlay on click
            // For Streamlit, we'd need a workaround using st.button or similar
        </script>
        """, unsafe_allow_html=True)
        
        # Add a button to dismiss the match overlay
        if st.button("Continue to Investment Details", key="continue_match"):
            st.session_state.show_match = False
            st.rerun()

if __name__ == "__main__":
    main()