import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import base64
from io import BytesIO

# Page configuration
st.set_page_config(
    page_title="Migration Tinder Pitch Deck",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Roboto', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }
    
    .main {
        background-color: #ffffff;
    }
    
    .title-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 3.5rem !important;
        font-weight: 700 !important;
        color: #0069b4 !important;
        text-align: center !important;
    }
    
    .subtitle-text {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem !important; 
        color: #555555 !important;
        text-align: center !important;
    }
    
    .slide-header {
        font-family: 'Montserrat', sans-serif;
        font-size: 2.2rem !important;
        font-weight: 600 !important;
        color: #0069b4 !important;
        margin-bottom: 1.5rem !important;
    }
    
    .highlight-box {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 20px;
        border-left: 5px solid #0069b4;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .metrics-box {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        min-height: 180px;
    }
    
    .stats-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    
    .stat-number {
        font-size: 2.5rem !important;
        font-weight: 700 !important;
        color: #0069b4 !important;
        margin-bottom: 0 !important;
    }
    
    .stat-text {
        font-size: 1.2rem !important;
        margin-top: 0 !important;
    }
    
    .nav-button {
        background-color: #0069b4;
        color: white;
        padding: 10px 24px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border: none;
    }
    
    .competition-box {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        margin: 10px 0;
    }
    
    .center-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    
    .business-model-card {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-top: 4px solid #0069b4;
        height: 100%;
    }
    
    .team-card {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #0069b4;
    }
    
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #f0f7ff;
        color: #555555;
        text-align: center;
        padding: 10px;
        font-size: 14px;
    }
    
    .testimonial-box {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #0069b4;
    }
    
    .testimonial-text {
        font-style: italic;
        font-size: 1.1rem;
        color: #333;
    }
    
    .testimonial-attribution {
        text-align: right;
        margin-top: 10px;
        font-weight: 500;
    }
    
    .gtm-stage {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-top: 4px solid #0069b4;
        height: 100%;
    }
    
    .ask-box {
        background-color: #f0f7ff;
        border-radius: 10px;
        padding: 30px;
        margin: 20px auto;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border: 2px solid #0069b4;
        max-width: 600px;
    }
    
    .ask-amount {
        font-size: 3rem !important;
        font-weight: 700 !important;
        color: #0069b4 !important;
        margin: 20px 0 !important;
    }
</style>
""", unsafe_allow_html=True)

# Function to create placeholder for images (since we don't have actual images)
def get_placeholder_image(width=300, height=200, text="Image Placeholder", color="#0069b4"):
    fig, ax = plt.subplots(figsize=(width/100, height/100))
    ax.set_facecolor('#f0f7ff')
    ax.text(0.5, 0.5, text, fontsize=12, ha='center', va='center', color=color)
    ax.axis('off')
    
    buf = BytesIO()
    fig.savefig(buf, format="png", bbox_inches='tight', pad_inches=0)
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode()
    plt.close(fig)
    
    return f"data:image/png;base64,{img_str}"

# Slide creation functions
def cover_slide():
    col1, col2, col3 = st.columns([1, 3, 1])
    
    with col2:
        st.markdown("<p class='title-text'>Migration Tinder</p>", unsafe_allow_html=True)
        st.markdown("<p class='subtitle-text'>Swipe Right for Global Talent</p>", unsafe_allow_html=True)
        
        # Logo placeholder
        logo_placeholder = get_placeholder_image(width=300, height=200, text="Migration Tinder Logo", color="#0069b4")
        st.markdown(f"<div style='text-align: center;'><img src='{logo_placeholder}' width='300'></div>", unsafe_allow_html=True)
        
        st.markdown("<p style='text-align: center; font-size: 1.2rem; margin-top: 2rem;'>Connecting international talent to German employers through human-centered matching</p>", unsafe_allow_html=True)
        
        st.markdown("<p style='text-align: center; margin-top: 4rem;'>Nima & Johannes | May 2025</p>", unsafe_allow_html=True)

def problem_slide():
    st.markdown("<h1 class='slide-header'>Germany's Workforce Crisis</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # Demographic decline chart
        demographic_data = pd.DataFrame({
            'Year': [2023, 2025, 2030, 2035, 2040],
            'Working Population (Millions)': [45, 44, 42, 40, 39]
        })
        
        fig = px.line(demographic_data, x='Year', y='Working Population (Millions)', 
                    title='Working Population Decline',
                    labels={'Working Population (Millions)': 'Millions'},
                    line_shape='spline')
        
        fig.update_traces(line_color='#0069b4', line_width=3)
        fig.update_layout(
            plot_bgcolor='white',
            title_font_size=18,
            height=400
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h2 style='color: #0069b4; text-align: center;'>Key Statistics</h2>", unsafe_allow_html=True)
        
        stat1, stat2, stat3 = st.columns(3)
        
        with stat1:
            st.markdown("<div class='stats-container'>", unsafe_allow_html=True)
            st.markdown("<p class='stat-number'>28.3%</p>", unsafe_allow_html=True)
            st.markdown("<p class='stat-text'>of companies can't find skilled workers</p>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
            
        with stat2:
            st.markdown("<div class='stats-container'>", unsafe_allow_html=True)
            st.markdown("<p class='stat-number'>6M</p>", unsafe_allow_html=True)
            st.markdown("<p class='stat-text'>working-age population decline by 2040</p>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
            
        with stat3:
            st.markdown("<div class='stats-container'>", unsafe_allow_html=True)
            st.markdown("<p class='stat-number'>€40B</p>", unsafe_allow_html=True)
            st.markdown("<p class='stat-text'>annual economic impact</p>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
            
        st.markdown("</div>", unsafe_allow_html=True)
    
    st.markdown("<h3 style='margin-top: 2rem;'>Stakeholder Pain Points</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 👤 Workers")
        st.markdown("Overwhelmed by complex bureaucracy and paperwork, facing lengthy visa processes, and struggling with qualification recognition.")
        st.markdown("</div>", unsafe_allow_html=True)
        
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🏢 Companies")
        st.markdown("Limited global reach, high administrative burden, difficulty evaluating foreign qualifications, and long recruitment cycles.")
        st.markdown("</div>", unsafe_allow_html=True)
        
    with col3:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🏛️ Government")
        st.markdown("Economic growth limitations, critical infrastructure gaps, and inefficient processing of skilled migration applications.")
        st.markdown("</div>", unsafe_allow_html=True)

def solution_slide():
    st.markdown("<h1 class='slide-header'>Our Solution</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # App mockup placeholder
        mockup_placeholder = get_placeholder_image(width=500, height=600, text="Migration Tinder App Mockup", color="#0069b4")
        st.markdown(f"<div style='text-align: center;'><img src='{mockup_placeholder}' width='450'></div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<h2 style='color: #0069b4; margin-bottom: 1.5rem;'>Migration Tinder</h2>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='font-size: 1.2rem; margin-bottom: 2rem;'>
            A gamified matching platform connecting international talent to German employers through human-centered interactions
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='font-size: 1.3rem; margin: 0.8rem 0;'>
            <span style='color: #0069b4;'>🤖</span> <b>AI-powered matching</b><br>
            <span style='font-size: 1rem; margin-left: 1.8rem;'>Skills over credentials</span>
        </div>
        
        <div style='font-size: 1.3rem; margin: 0.8rem 0;'>
            <span style='color: #0069b4;'>💬</span> <b>Human-first connections</b><br>
            <span style='font-size: 1rem; margin-left: 1.8rem;'>Direct employer-candidate communication</span>
        </div>
        
        <div style='font-size: 1.3rem; margin: 0.8rem 0;'>
            <span style='color: #0069b4;'>🚀</span> <b>Streamlined process</b><br>
            <span style='font-size: 1rem; margin-left: 1.8rem;'>Integrated with government systems</span>
        </div>
        
        <div style='font-size: 1.3rem; margin: 0.8rem 0;'>
            <span style='color: #0069b4;'>🎮</span> <b>Gamified experience</b><br>
            <span style='font-size: 1rem; margin-left: 1.8rem;'>Interactive skill verification and assessment</span>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    st.markdown("<div style='margin-top: 2rem;'></div>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div style='background-color: #f0f7ff; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 2.2rem; font-weight: 700; color: #0069b4; margin: 0;'>65%</p>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 1.2rem; margin-top: 5px;'>faster hiring</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div style='background-color: #f0f7ff; border-radius: 10px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 2.2rem; font-weight: 700; color: #0069b4; margin: 0;'>30%</p>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 1.2rem; margin-top: 5px;'>higher match quality</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)

def why_now_slide():
    st.markdown("<h1 class='slide-header'>Why Now?</h1>", unsafe_allow_html=True)
    
    # Timeline visualization
    timeline_data = pd.DataFrame({
        'Year': [2022, 2023, 2024, 2025],
        'Position': [1, 2, 3, 4],
        'Event': [
            'Fachkräfteeinwanderungsgesetz',
            'Digital transformation in government',
            '200,000 skilled migrants vs. 300,000+ needed',
            'Growing acceptance of gamification'
        ],
        'Icon': ['⚖️', '💻', '📊', '🎮']
    })
    
    fig = go.Figure()
    
    # Add timeline line
    fig.add_shape(
        type="line",
        x0=2022,
        y0=1,
        x1=2025,
        y1=1,
        line=dict(color="#0069b4", width=5)
    )
    
    # Add timeline points and labels
    for index, row in timeline_data.iterrows():
        fig.add_trace(go.Scatter(
            x=[row['Year']],
            y=[1],
            mode="markers",
            marker=dict(size=20, color="#0069b4"),
            showlegend=False
        ))
        
        fig.add_annotation(
            x=row['Year'],
            y=1.2,
            text=f"<b>{row['Icon']}<br>{row['Year']}</b><br>{row['Event']}",
            showarrow=False,
            font=dict(size=14),
            align="center",
            bgcolor="#f0f7ff",
            bordercolor="#0069b4",
            borderwidth=2,
            borderpad=4,
            opacity=0.8
        )
    
    # Add window of opportunity
    fig.add_shape(
        type="circle",
        xref="x",
        yref="y",
        x0=2024.5,
        y0=0.6,
        x1=2025.5,
        y1=1.4,
        line_color="#ff6b6b",
        line_width=2,
        line_dash="dash",
        fillcolor="rgba(255, 107, 107, 0.1)"
    )
    
    fig.add_annotation(
        x=2025,
        y=1,
        text="<b>Window of<br>opportunity</b>",
        showarrow=False,
        font=dict(color="#ff6b6b", size=16),
        align="center"
    )
    
    fig.update_layout(
        height=400,
        plot_bgcolor='white',
        paper_bgcolor='white',
        xaxis=dict(
            title=None,
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[2021.5, 2025.5]
        ),
        yaxis=dict(
            title=None,
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[0.5, 1.5]
        ),
        margin=dict(l=20, r=20, t=20, b=20)
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Quote
    st.markdown("""
    <div style='background-color: #f0f7ff; border-radius: 10px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'>
        <p style='font-style: italic; font-size: 1.2rem; text-align: center;'>
            "Germany's future economic success depends on our ability to attract skilled workers from abroad. We need innovative solutions now."
        </p>
        <p style='text-align: right; font-weight: 500;'>
            — Federal Ministry of Labor and Social Affairs, 2025
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Additional context
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🔍 Changing Regulation")
        st.markdown("The Fachkräfteeinwanderungsgesetz has created a legal framework, but implementation remains challenging for both employers and candidates.")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📱 Digital Readiness")
        st.markdown("Government systems are now API-ready, allowing for seamless integration and automated processing of skilled worker applications.")
        st.markdown("</div>", unsafe_allow_html=True)

def market_size_slide():
    st.markdown("<h1 class='slide-header'>Market Opportunity</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # TAM/SAM/SOM Funnel
        tam_sam_som_data = pd.DataFrame({
            'Category': ['TAM', 'SAM', 'SOM'],
            'Value': [40, 4, 0.4],  # In billions
            'Description': [
                "Germany's skilled worker recruitment market",
                "International recruitment segment",
                "Our target for first 5 years"
            ]
        })
        
        colors = ['#cce5ff', '#99ccff', '#0069b4']
        
        fig = go.Figure()
        
        fig.add_trace(go.Funnel(
            y=tam_sam_som_data['Category'],
            x=tam_sam_som_data['Value'],
            textinfo="value+percent initial",
            textposition="inside",
            textfont=dict(size=16),
            marker=dict(color=colors),
            connector=dict(line=dict(color="royalblue", width=1))
        ))
        
        for i, row in tam_sam_som_data.iterrows():
            fig.add_annotation(
                x=row['Value'] * 1.2,
                y=row['Category'],
                text=f"<b>{row['Category']}</b>: €{row['Value']}B<br>{row['Description']}",
                showarrow=False,
                font=dict(size=14),
                align="left"
            )
        
        fig.update_layout(
            title="Market Size Opportunity",
            height=500
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Annual migration bar chart
        migration_data = pd.DataFrame({
            'Category': ['Current', 'Needed'],
            'Value': [200, 300],  # In thousands
            'Color': ['#0069b4', '#ff6b6b']
        })
        
        fig = go.Figure()
        
        fig.add_trace(go.Bar(
            x=migration_data['Category'],
            y=migration_data['Value'],
            text=migration_data['Value'].apply(lambda x: f"{x}K"),
            textposition='auto',
            marker_color=migration_data['Color'],
            width=0.6
        ))
        
        fig.add_annotation(
            x=0.5,
            y=290,
            text="Annual Gap:<br>100,000+ skilled workers",
            showarrow=False,
            font=dict(size=16, color="#ff6b6b"),
            align="center",
            bgcolor="#f0f7ff",
            bordercolor="#ff6b6b",
            borderwidth=2,
            borderpad=4
        )
        
        fig.update_layout(
            title="Annual Skilled Worker Migration",
            yaxis_title="Number of Workers (thousands)",
            height=500,
            yaxis=dict(range=[0, 350])
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    # Pricing information
    st.markdown("""
    <div style="background-color: #f0f7ff; border-radius: 10px; padding: 20px; margin: 20px auto; text-align: center; width: 300px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="margin-bottom: 5px; color: #0069b4;">€150</h2>
        <p style="font-size: 1.2rem; margin-top: 0;">per successful match</p>
        <p style="font-style: italic; font-size: 0.9rem;">Clear unit economics with high margins</p>
    </div>
    """, unsafe_allow_html=True)

def competition_slide():
    st.markdown("<h1 class='slide-header'>Where Others Fall Short</h1>", unsafe_allow_html=True)
    
    # Competitive matrix visualization
    fig = go.Figure()
    
    # Define competitors and their positions
    competitors = [
        {'name': 'Indeed', 'x': 0.2, 'y': 0.2},
        {'name': 'Monster', 'x': 0.25, 'y': 0.1},
        {'name': 'LinkedIn', 'x': 0.35, 'y': 0.3},
        {'name': 'StepStone', 'x': 0.4, 'y': 0.4},
        {'name': 'Xing', 'x': 0.5, 'y': 0.45},
        {'name': 'Migration Tinder', 'x': 0.85, 'y': 0.85}
    ]
    
    # Add competitors as scatter points
    for comp in competitors:
        fig.add_trace(go.Scatter(
            x=[comp['x']],
            y=[comp['y']],
            mode='markers+text',
            name=comp['name'],
            text=[comp['name']],
            textposition="top center",
            marker=dict(
                size=20 if comp['name'] == 'Migration Tinder' else 15,
                color='#0069b4' if comp['name'] == 'Migration Tinder' else '#999999',
                line=dict(width=2, color='#ffffff')
            ),
            textfont=dict(
                size=14,
                color='#0069b4' if comp['name'] == 'Migration Tinder' else '#333333'
            )
        ))
    
    # Add dividing lines
    fig.add_shape(
        type="line",
        x0=0.6,
        y0=0,
        x1=0.6,
        y1=1,
        line=dict(color="#ff6b6b", width=2, dash="dash")
    )
    
    fig.add_shape(
        type="line",
        x0=0,
        y0=0.5,
        x1=1,
        y1=0.5,
        line=dict(color="#ff6b6b", width=2, dash="dash")
    )
    
    # Add annotations for quadrants
    fig.add_annotation(
        x=0.85,
        y=0.75,
        text="Opportunity<br>Space",
        showarrow=False,
        font=dict(color="#ff6b6b", size=16),
        align="center"
    )
    
    # Add axis labels
    fig.add_annotation(
        x=1,
        y=0,
        text="Migration-specific",
        showarrow=False,
        xanchor="right",
        yanchor="bottom",
        font=dict(size=14)
    )
    
    fig.add_annotation(
        x=0,
        y=1,
        text="Innovative",
        showarrow=False,
        xanchor="left",
        yanchor="top",
        font=dict(size=14)
    )
    
    fig.add_annotation(
        x=0,
        y=0,
        text="Generic",
        showarrow=False,
        xanchor="left",
        yanchor="bottom",
        font=dict(size=14)
    )
    
    fig.add_annotation(
        x=0,
        y=0.5,
        text="Traditional",
        showarrow=False,
        xanchor="left",
        yanchor="middle",
        font=dict(size=14)
    )
    
    fig.update_layout(
        height=500,
        xaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[-0.1, 1.1]
        ),
        yaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[-0.1, 1.1]
        ),
        showlegend=False,
        plot_bgcolor='white',
        margin=dict(l=20, r=20, t=20, b=20)
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Key differentiators
    st.markdown("""
    <div class='highlight-box' style='margin-top: 2rem;'>
        <h3 style='color: #0069b4;'>Key differentiators:</h3>
        <ul style='font-size: 1.1rem;'>
            <li><b>Migration-focused experience</b> vs. generic job platforms</li>
            <li><b>Human-first connections</b> before paperwork</li>
            <li><b>Government integration</b> for streamlined processes</li>
            <li><b>Skill-based matching</b> rather than credential focus</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    # Competitor weaknesses
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='competition-box'>", unsafe_allow_html=True)
        st.markdown("### LinkedIn & Xing")
        st.markdown("Premium costs deter users, auto-archiving of non-EU candidates, small international job pool, limited migration support")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='competition-box'>", unsafe_allow_html=True)
        st.markdown("### Job Boards (Indeed, Monster, StepStone)")
        st.markdown("Overwhelming for niche seekers, limited filters, no migration focus, high costs for small firms, generic experience")
        st.markdown("</div>", unsafe_allow_html=True)

def product_slide():
    st.markdown("<h1 class='slide-header'>Product Experience</h1>", unsafe_allow_html=True)
    
    # App mockup placeholders
    mockup_placeholder1 = get_placeholder_image(width=250, height=500, text="Profile Creation", color="#0069b4")
    mockup_placeholder2 = get_placeholder_image(width=250, height=500, text="Matching Interface", color="#0069b4")
    mockup_placeholder3 = get_placeholder_image(width=250, height=500, text="Direct Messaging", color="#0069b4")
    mockup_placeholder4 = get_placeholder_image(width=250, height=500, text="Visa Tracking", color="#0069b4")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown(f"<div style='text-align: center;'><img src='{mockup_placeholder1}' width='200'></div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"<div style='text-align: center;'><img src='{mockup_placeholder2}' width='200'></div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"<div style='text-align: center;'><img src='{mockup_placeholder3}' width='200'></div>", unsafe_allow_html=True)
    
    with col4:
        st.markdown(f"<div style='text-align: center;'><img src='{mockup_placeholder4}' width='200'></div>", unsafe_allow_html=True)
    
    # User flow diagram
    st.markdown("<div style='margin: 30px 0;'></div>", unsafe_allow_html=True)
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("<div class='center-content'>", unsafe_allow_html=True)
        st.markdown("### 1. Create Profile")
        st.markdown("Users create skill-based profiles with verified credentials and preferences")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='center-content'>", unsafe_allow_html=True)
        st.markdown("### 2. Match")
        st.markdown("AI algorithm matches workers with employers based on skills and needs")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='center-content'>", unsafe_allow_html=True)
        st.markdown("### 3. Connect")
        st.markdown("Direct messaging and video calls before any paperwork begins")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col4:
        st.markdown("<div class='center-content'>", unsafe_allow_html=True)
        st.markdown("### 4. Apply")
        st.markdown("Streamlined visa application with progress tracking and support")
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Arrow connecting flow steps
    st.markdown("""
    <div style='display: flex; justify-content: center; margin: 20px 0;'>
        <div style='width: 80%; height: 5px; background-color: #0069b4; position: relative;'>
            <div style='position: absolute; right: -10px; top: -8px; width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 15px solid #0069b4;'></div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Key features
    st.markdown("<h3 style='margin-top: 2rem;'>Key Technical Features</h3>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("### 🧠 Smart Matching Algorithm")
        st.markdown("""
        - Natural Language Processing for skill matching
        - Multi-language support for global accessibility
        - Continuous learning from match outcomes
        - Personalized recommendations based on success patterns
        """)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("### 🔄 Government System Integration")
        st.markdown("""
        - API connections to visa processing systems
        - Automated document verification and submission
        - Real-time application status updates
        - Compliance with all data protection regulations
        """)
        st.markdown("</div>", unsafe_allow_html=True)

def market_validation_slide():
    st.markdown("<h1 class='slide-header'>Market Validation</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # Testimonials
        st.markdown("<div class='testimonial-box'>", unsafe_allow_html=True)
        st.markdown("<span style='font-size: 2rem; color: #0069b4;'>❝</span>", unsafe_allow_html=True)
        st.markdown("<p class='testimonial-text'>The direct communication before paperwork would save us months in the hiring process. This solves our biggest pain point when recruiting internationally.</p>", unsafe_allow_html=True)
        st.markdown("<p class='testimonial-attribution'>— HR Manager, Manufacturing SME</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
        
        st.markdown("<div class='testimonial-box'>", unsafe_allow_html=True)
        st.markdown("<span style='font-size: 2rem; color: #0069b4;'>❝</span>", unsafe_allow_html=True)
        st.markdown("<p class='testimonial-text'>I abandoned three German job applications because the process was too complex. This would have made all the difference in my decision to move to Germany.</p>", unsafe_allow_html=True)
        st.markdown("<p class='testimonial-attribution'>— Software Engineer, India</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        # Customer discovery metrics
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h3 style='color: #0069b4; text-align: center;'>Customer Discovery</h3>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='display: flex; align-items: center; margin: 15px 0;'>
            <div style='font-size: 2rem; color: #0069b4; margin-right: 15px;'>👥</div>
            <div>
                <span style='font-size: 1.3rem; font-weight: 600;'>15</span>
                <span style='font-size: 1.1rem;'> HR managers</span>
            </div>
        </div>
        
        <div style='display: flex; align-items: center; margin: 15px 0;'>
            <div style='font-size: 2rem; color: #0069b4; margin-right: 15px;'>👥</div>
            <div>
                <span style='font-size: 1.3rem; font-weight: 600;'>22</span>
                <span style='font-size: 1.1rem;'> international workers</span>
            </div>
        </div>
        
        <div style='display: flex; align-items: center; margin: 15px 0;'>
            <div style='font-size: 2rem; color: #0069b4; margin-right: 15px;'>👥</div>
            <div>
                <span style='font-size: 1.3rem; font-weight: 600;'>8</span>
                <span style='font-size: 1.1rem;'> government officials</span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
        
        # Key findings bar chart
        findings_data = pd.DataFrame({
            'Metric': ['Reduced abandonment', 'Faster processing', 'Higher match quality'],
            'Value': [40, 65, 30],
            'Color': ['#99ccff', '#0069b4', '#ff6b6b']
        })
        
        fig = go.Figure()
        
        fig.add_trace(go.Bar(
            x=findings_data['Metric'],
            y=findings_data['Value'],
            text=findings_data['Value'].apply(lambda x: f"{x}%"),
            textposition='auto',
            marker_color=findings_data['Color'],
            width=0.6
        ))
        
        fig.update_layout(
            title="Key Performance Improvements",
            yaxis_title="Percent Improvement",
            height=300,
            yaxis=dict(range=[0, 70])
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    # Validation methodology
    st.markdown("<h3 style='margin-top: 1rem;'>Validation Methodology</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📋 Problem Interviews")
        st.markdown("Structured interviews using Jobs-to-be-Done framework to identify core pain points and unmet needs in the current process")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📱 Prototype Testing")
        st.markdown("Wireframe testing with 5 HR departments and 12 international candidates to validate user experience and core value proposition")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📊 Data Analysis")
        st.markdown("Evaluation of processing times and abandonment rates from 500+ visa applications (2023-2024) to quantify potential impact")
        st.markdown("</div>", unsafe_allow_html=True)

def business_model_slide():
    st.markdown("<h1 class='slide-header'>Business Model</h1>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='business-model-card'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>🏢</div>", unsafe_allow_html=True)
        st.markdown("<h3>Employers</h3>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 20px 0;'><b>Freemium:</b> 10 free postings</p>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 1.8rem; font-weight: 700; color: #0069b4; margin: 15px 0;'>€150</p>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 15px 0;'>per additional posting</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='business-model-card'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>👤</div>", unsafe_allow_html=True)
        st.markdown("<h3>Candidates</h3>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 20px 0;'><b>Basic:</b> Free</p>", unsafe_allow_html=True)
        st.markdown("<p style='font-size: 1.8rem; font-weight: 700; color: #0069b4; margin: 15px 0;'>€9.99</p>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 15px 0;'>per month (Premium)</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='business-model-card'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>🏛️</div>", unsafe_allow_html=True)
        st.markdown("<h3>Government</h3>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 20px 0;'><b>Integration fees</b></p>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 20px 0;'><b>SaaS licenses</b></p>", unsafe_allow_html=True)
        st.markdown("<p style='margin: 15px 0;'>for visa processing</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Unit economics
    st.markdown("<div style='margin-top: 2rem;'></div>", unsafe_allow_html=True)
    
    st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
    st.markdown("<h3 style='color: #0069b4;'>Unit Economics:</h3>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Employer economics
        fig = go.Figure()
        
        fig.add_trace(go.Bar(
            x=['CAC', 'LTV'],
            y=[35, 450],
            text=['€35', '€450'],
            textposition='auto',
            marker_color=['#99ccff', '#0069b4'],
            width=0.6
        ))
        
        fig.update_layout(
            title="Employer Economics",
            height=300,
            yaxis=dict(range=[0, 500])
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        # Candidate economics
        fig = go.Figure()
        
        fig.add_trace(go.Bar(
            x=['CAC', 'LTV'],
            y=[12, 65],
            text=['€12', '€65'],
            textposition='auto',
            marker_color=['#99ccff', '#0069b4'],
            width=0.6
        ))
        
        fig.update_layout(
            title="Candidate Economics",
            height=300,
            yaxis=dict(range=[0, 100])
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Revenue streams pie chart
    st.markdown("<h3 style='margin-top: 2rem;'>Revenue Distribution (Year 3)</h3>", unsafe_allow_html=True)
    
    revenue_data = pd.DataFrame({
        'Stream': ['Employer Postings', 'Premium Subscriptions', 'Government Contracts'],
        'Value': [60, 25, 15]
    })
    
    fig = go.Figure(data=[go.Pie(
        labels=revenue_data['Stream'],
        values=revenue_data['Value'],
        hole=.4,
        marker_colors=['#0069b4', '#99ccff', '#cce5ff']
    )])
    
    fig.update_layout(
        height=400,
        annotations=[dict(text='Revenue<br>Mix', x=0.5, y=0.5, font_size=20, showarrow=False)]
    )
    
    st.plotly_chart(fig, use_container_width=True)

def go_to_market_slide():
    st.markdown("<h1 class='slide-header'>Go-To-Market Strategy</h1>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='gtm-stage'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>🏛️</div>", unsafe_allow_html=True)
        st.markdown("<h3>Phase 1</h3>", unsafe_allow_html=True)
        st.markdown("<h4>Government Partnerships</h4>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='text-align: left;'>
            <li>Integration with Make-it-in-Germany</li>
            <li>API connections to visa processing</li>
            <li>Pre-launch authority validation</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='gtm-stage'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>🌎</div>", unsafe_allow_html=True)
        st.markdown("<h3>Phase 2</h3>", unsafe_allow_html=True)
        st.markdown("<h4>Source Country Outreach</h4>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='text-align: left;'>
            <li>Partnerships with Außenhandelskammern</li>
            <li>Embassy collaborations</li>
            <li>Digital marketing in key countries</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='gtm-stage'>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 2.5rem; color: #0069b4; margin-bottom: 15px;'>🏢</div>", unsafe_allow_html=True)
        st.markdown("<h3>Phase 3</h3>", unsafe_allow_html=True)
        st.markdown("<h4>SME Targeting</h4>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='text-align: left;'>
            <li>Industry association partnerships</li>
            <li>Focused on high-demand sectors</li>
            <li>Referral incentives (€30/referral)</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Timeline visualization with arrows
    st.markdown("""
    <div style='display: flex; justify-content: center; margin: 30px 0;'>
        <div style='width: 80%; height: 5px; background-color: #0069b4; position: relative;'>
            <div style='position: absolute; left: 0; top: -25px; text-align: center; width: 80px;'>Q2 2025</div>
            <div style='position: absolute; left: 33%; top: -25px; text-align: center; width: 80px;'>Q4 2025</div>
            <div style='position: absolute; left: 66%; top: -25px; text-align: center; width: 80px;'>Q2 2026</div>
            <div style='position: absolute; right: -10px; top: -8px; width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 15px solid #0069b4;'></div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Target regions
    st.markdown("<h3 style='margin-top: 2rem;'>Target Source Countries</h3>", unsafe_allow_html=True)
    
    # Simple world map visualization highlighting key target regions
    region_data = pd.DataFrame({
        'Country': ['India', 'Philippines', 'Vietnam', 'Brazil', 'Mexico', 'Ukraine', 'Turkey', 'Morocco', 'Tunisia', 'Nigeria'],
        'Priority': [10, 8, 8, 7, 7, 9, 6, 6, 5, 5],
        'Sector Focus': ['Tech & Engineering', 'Healthcare', 'Manufacturing', 'Engineering', 'Construction', 'Tech & Engineering', 'Manufacturing', 'Engineering', 'Services', 'Tech']
    })
    
    fig = px.scatter_geo(
        region_data, 
        locations='Country', 
        locationmode='country names',
        size='Priority',
        text='Country',
        color='Priority',
        color_continuous_scale='Blues',
        projection='natural earth',
        hover_data=['Sector Focus']
    )
    
    fig.update_layout(
        height=400,
        geo=dict(
            showland=True,
            landcolor='rgb(240, 240, 240)',
            countrycolor='rgb(200, 200, 200)',
            showocean=True,
            oceancolor='rgb(230, 240, 250)',
            showcountries=True
        ),
        coloraxis_showscale=False
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Employer outreach strategies
    st.markdown("<h3 style='margin-top: 1rem;'>Employer Acquisition Channels</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🤝 Industry Partnerships")
        st.markdown("Collaborations with industry associations in sectors facing the most acute worker shortages (healthcare, engineering, IT, and manufacturing)")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🎯 Targeted Campaigns")
        st.markdown("Vertical-specific marketing in trade publications, conferences, and digital channels frequented by HR decision-makers")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🔄 Referral Program")
        st.markdown("Employer-to-employer referral incentives with €100 credits for successful onboarding of new companies to the platform")
        st.markdown("</div>", unsafe_allow_html=True)

def financials_slide():
    st.markdown("<h1 class='slide-header'>Financial Roadmap</h1>", unsafe_allow_html=True)
    
    # Revenue projection chart
    revenue_data = pd.DataFrame({
        'Quarter': ['Q3 \'25', 'Q4 \'25', 'Q1 \'26', 'Q2 \'26', 'Q3 \'26', 'Q4 \'26', 'Q1 \'27', 'Q2 \'27', 'Q3 \'27'],
        'Revenue (€M)': [0.05, 0.15, 0.3, 0.45, 0.75, 1.0, 1.4, 1.6, 1.8],
        'Operating Cost (€M)': [0.15, 0.18, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
    })
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=revenue_data['Quarter'],
        y=revenue_data['Revenue (€M)'],
        mode='lines+markers',
        name='Revenue',
        line=dict(color='#0069b4', width=3),
        marker=dict(size=8)
    ))
    
    fig.add_trace(go.Scatter(
        x=revenue_data['Quarter'],
        y=revenue_data['Operating Cost (€M)'],
        mode='lines+markers',
        name='Operating Cost',
        line=dict(color='#ff6b6b', width=3),
        marker=dict(size=8)
    ))
    
    # Add break-even point
    fig.add_vline(x=3, line_dash="dash", line_color="#ff6b6b")
    
    fig.add_annotation(
        x=3,
        y=1.5,
        text="Break-even<br>18-24 months",
        showarrow=False,
        font=dict(color="#ff6b6b", size=14),
        bgcolor="#f0f7ff",
        bordercolor="#ff6b6b",
        borderwidth=2,
        borderpad=4
    )
    
    # Mark key revenue points
    fig.add_annotation(
        x=2,
        y=0.3,
        text="€300K",
        showarrow=False,
        yshift=15,
        font=dict(color="#0069b4", size=12)
    )
    
    fig.add_annotation(
        x=5,
        y=0.75,
        text="€750K",
        showarrow=False,
        yshift=15,
        font=dict(color="#0069b4", size=12)
    )
    
    fig.add_annotation(
        x=8,
        y=1.8,
        text="€1.8M",
        showarrow=False,
        yshift=15,
        font=dict(color="#0069b4", size=12)
    )
    
    # Mark Series A point
    fig.add_annotation(
        x=8,
        y=2.3,
        text="Series A<br>5,000 matches",
        showarrow=False,
        font=dict(color="#ff6b6b", size=14),
        bgcolor="#f0f7ff",
        bordercolor="#ff6b6b",
        borderwidth=2,
        borderpad=4
    )
    
    fig.update_layout(
        title="Revenue and Cost Projections",
        xaxis_title="Quarter",
        yaxis_title="€ Millions",
        height=400,
        yaxis=dict(range=[0, 2.5]),
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1
        )
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Key financial metrics
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h3 style='color: #0069b4;'>Key Milestones:</h3>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='font-size: 1.1rem;'>
            <li><b>Break-even:</b> 18-24 months</li>
            <li><b>Profitability:</b> 24 months</li>
            <li><b>Series A trigger:</b> 5,000 successful matches</li>
            <li><b>Growth rate:</b> 40% quarterly after launch</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h3 style='color: #0069b4;'>Financial Metrics:</h3>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='font-size: 1.1rem;'>
            <li><b>Monthly burn rate:</b> €25K</li>
            <li><b>Initial runway:</b> 18 months</li>
            <li><b>Gross margin:</b> 75%</li>
            <li><b>Customer acquisition payback:</b> 4 months</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Key revenue drivers
    st.markdown("<h3 style='margin-top: 2rem;'>Key Revenue Drivers</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📈 User Growth")
        st.markdown("""
        - 5,000 employer accounts by Q4 2025
        - 50,000 candidate profiles by Q4 2025
        - 30% conversion to premium services
        """)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🔄 Matching Efficiency")
        st.markdown("""
        - 20% match rate in year one
        - 35% match rate by year two
        - 5,000 successful placements by Q3 2027
        """)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🏛️ Government Contracts")
        st.markdown("""
        - 3 government partnerships by Q1 2026
        - Integration with 5 embassies by Q3 2026
        - 15% of revenue from SaaS licenses by Q2 2027
        """)
        st.markdown("</div>", unsafe_allow_html=True)

def roadmap_slide():
    st.markdown("<h1 class='slide-header'>24-Month Execution Plan</h1>", unsafe_allow_html=True)
    
    # Timeline visualization
    timeline_data = pd.DataFrame({
        'Phase': ['Platform Development', 'Government Integrations', 'Market Launch', 'Team Expansion', 'Series A'],
        'Start': ['Q2 \'25', 'Q3 \'25', 'Q4 \'25', 'Q1 \'26', 'Q2 \'26'],
        'Budget': ['€60K', '€30K', '€40K', '€20K', ''],
        'Icon': ['💻', '🔌', '🚀', '👥', '🔍']
    })
    
    fig = go.Figure()
    
    # Add timeline line
    fig.add_shape(
        type="line",
        x0=0,
        y0=1,
        x1=4,
        y1=1,
        line=dict(color="#0069b4", width=5)
    )
    
    # Add timeline points
    for i, row in timeline_data.iterrows():
        fig.add_trace(go.Scatter(
            x=[i],
            y=[1],
            mode="markers",
            marker=dict(
                size=20, 
                color="#0069b4" if i < 4 else "#ff6b6b",
                line=dict(width=2, color="white")
            ),
            showlegend=False
        ))
        
        fig.add_annotation(
            x=i,
            y=1.3,
            text=f"{row['Icon']}<br>{row['Phase']}<br>{row['Budget']}",
            showarrow=False,
            font=dict(size=14),
            align="center",
            bgcolor="#f0f7ff" if i < 4 else "#ffebee",
            bordercolor="#0069b4" if i < 4 else "#ff6b6b",
            borderwidth=2,
            borderpad=4
        )
        
        fig.add_annotation(
            x=i,
            y=0.7,
            text=f"<b>{row['Start']}</b>",
            showarrow=False,
            font=dict(size=12),
            align="center"
        )
    
    fig.update_layout(
        height=300,
        xaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[-0.5, 4.5]
        ),
        yaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[0, 2]
        ),
        plot_bgcolor='white'
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Development roadmap details
    st.markdown("<h3 style='margin-top: 1rem;'>Development Milestones</h3>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h4>Q2-Q3 2025: Platform Build</h4>", unsafe_allow_html=True)
        st.markdown("""
        <ul>
            <li>Core matching algorithm development</li>
            <li>User interface design and implementation</li>
            <li>Initial language support (English, German, Spanish, Hindi)</li>
            <li>Basic skill assessment modules</li>
            <li>Security and data protection implementation</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h4>Q4 2025-Q1 2026: Go-to-Market</h4>", unsafe_allow_html=True)
        st.markdown("""
        <ul>
            <li>Government API integrations</li>
            <li>Visa application automation</li>
            <li>Industry-specific skill assessments</li>
            <li>Employer dashboard development</li>
            <li>Analytics and reporting systems</li>
            <li>Marketing website and content creation</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Funding allocation
    st.markdown("<h3 style='margin-top: 2rem;'>Seed Funding Allocation</h3>", unsafe_allow_html=True)
    
    funding_data = pd.DataFrame({
        'Category': ['Platform Development', 'Government Integrations', 'Go-to-Market', 'Team Expansion'],
        'Amount': [60, 30, 40, 20],
        'Color': ['#0069b4', '#3a86ff', '#8ecae6', '#caf0f8']
    })
    
    fig = go.Figure(data=[go.Pie(
        labels=funding_data['Category'],
        values=funding_data['Amount'],
        hole=.4,
        marker_colors=funding_data['Color'],
        textinfo='label+percent',
        textposition='outside'
    )])
    
    fig.update_layout(
        height=400,
        annotations=[dict(text='€150K', x=0.5, y=0.5, font_size=20, showarrow=False)]
    )
    
    st.plotly_chart(fig, use_container_width=True)

def team_slide():
    st.markdown("<h1 class='slide-header'>The Team</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='team-card'>", unsafe_allow_html=True)
        
        # Team member photo placeholder
        photo_placeholder = get_placeholder_image(width=200, height=200, text="Nima", color="#0069b4")
        st.markdown(f"<div style='text-align: center;'><img src='{photo_placeholder}' width='150' style='border-radius: 50%;'></div>", unsafe_allow_html=True)
        
        st.markdown("<h2 style='color: #0069b4; margin-top: 15px;'>Nima</h2>", unsafe_allow_html=True)
        st.markdown("<p style='font-style: italic; margin-bottom: 20px;'>Data Scientist @ Welthungerhilfe</p>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='text-align: left;'>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>💻 AI/ML Expertise</span> - Deep learning, matching algorithms, NLP</p>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>📊 Data Analysis</span> - Predictive modeling, pattern recognition</p>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>🎨 Product Design</span> - User-centered design, UX/UI</p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='team-card'>", unsafe_allow_html=True)
        
        # Team member photo placeholder
        photo_placeholder = get_placeholder_image(width=200, height=200, text="Johannes", color="#0069b4")
        st.markdown(f"<div style='text-align: center;'><img src='{photo_placeholder}' width='150' style='border-radius: 50%;'></div>", unsafe_allow_html=True)
        
        st.markdown("<h2 style='color: #0069b4; margin-top: 15px;'>Johannes</h2>", unsafe_allow_html=True)
        st.markdown("<p style='font-style: italic; margin-bottom: 20px;'>GenAI Engineer @ Accenture<br>Former Policy Advisor, German Bundestag</p>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='text-align: left;'>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>🤖 GenAI Development</span> - LLMs, AI integration, scalable systems</p>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>🏛️ Public Sector Knowledge</span> - Government systems, policy landscape</p>
            <p style='margin: 8px 0;'><span style='color: #0069b4; font-weight: 600;'>💼 Policy Expertise</span> - Immigration frameworks, regulatory affairs</p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Complementary skills
    st.markdown("<div style='margin-top: 2rem;'></div>", unsafe_allow_html=True)
    
    st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
    st.markdown("<h3 style='color: #0069b4; text-align: center;'>The Perfect Match: Tech Expertise Meets Policy Experience</h3>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div style='text-align: left;'>
            <h4>Technical Capabilities</h4>
            <ul>
                <li>AI matching algorithm development</li>
                <li>Multi-language natural language processing</li>
                <li>Secure platform architecture</li>
                <li>Data analysis and pattern recognition</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style='text-align: left;'>
            <h4>Policy & Business Insights</h4>
            <ul>
                <li>Deep understanding of migration frameworks</li>
                <li>Government stakeholder relationships</li>
                <li>Public sector procurement knowledge</li>
                <li>International partnership building</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Future team expansion
    st.markdown("<h3 style='margin-top: 2rem;'>Planned Team Expansion</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 📱 Frontend Developer")
        st.markdown("Mobile-first development, cross-platform expertise, React Native specialist")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 👥 Customer Success Manager")
        st.markdown("Multilingual, migration expertise, HR background, relationship builder")
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='metrics-box'>", unsafe_allow_html=True)
        st.markdown("### 🌎 International Partnerships Lead")
        st.markdown("Embassy connections, multicultural experience, business development background")
        st.markdown("</div>", unsafe_allow_html=True)

def ask_slide():
    st.markdown("<h1 class='slide-header'>Our Ask</h1>", unsafe_allow_html=True)
    
    # Funding request
    st.markdown("<div class='ask-box'>", unsafe_allow_html=True)
    st.markdown("<p class='ask-amount'>€150K Seed Funding</p>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Funding allocation visualization
    funding_data = pd.DataFrame({
        'Category': ['Platform Development', 'Government Integrations', 'Go-to-Market', 'Team Expansion'],
        'Amount': [60, 30, 40, 20],
        'Color': ['#0069b4', '#3a86ff', '#8ecae6', '#caf0f8']
    })
    
    fig = go.Figure(data=[go.Bar(
        x=funding_data['Category'],
        y=funding_data['Amount'],
        text=funding_data['Amount'].apply(lambda x: f"€{x}K"),
        textposition='auto',
        marker_color=funding_data['Color'],
        width=0.6
    )])
    
    fig.update_layout(
        title="Funding Allocation",
        yaxis_title="Amount (€ thousands)",
        height=400
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Value proposition to investors
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h3 style='color: #0069b4;'>Why Invest Now?</h3>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='font-size: 1.1rem;'>
            <li><b>Perfect timing</b> with new regulations and digital readiness</li>
            <li><b>Massive market opportunity</b> in €40B skilled worker recruitment</li>
            <li><b>Proven demand</b> from both employers and candidates</li>
            <li><b>Clear path to profitability</b> within 24 months</li>
            <li><b>Multi-revenue streams</b> for sustainable growth</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='highlight-box'>", unsafe_allow_html=True)
        st.markdown("<h3 style='color: #0069b4;'>Beyond Financial Support</h3>", unsafe_allow_html=True)
        st.markdown("""
        <ul style='font-size: 1.1rem;'>
            <li><b>Strategic introductions</b> to government stakeholders</li>
            <li><b>Industry partnerships</b> in key sectors</li>
            <li><b>International expansion</b> expertise</li>
            <li><b>HR tech knowledge</b> and connections</li>
            <li><b>Public sector procurement</b> guidance</li>
        </ul>
        """, unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Final call to action
    st.markdown("""
    <div style='text-align: center; margin-top: 2rem;'>
        <h3>Together, we can transform Germany's skilled migration challenge into an economic opportunity</h3>
    </div>
    """, unsafe_allow_html=True)

def contact_slide():
    st.markdown("<h1 class='slide-header'>Thank You</h1>", unsafe_allow_html=True)
    
    st.markdown("<div style='text-align: center;'>", unsafe_allow_html=True)
    st.markdown("<h2 style='margin-top: 2rem;'>Let's Connect</h2>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("""
        <div style='margin: 40px auto; font-size: 1.2rem;'>
            <p style='margin: 20px 0;'><span style='color: #0069b4; margin-right: 15px;'>📧</span> contact@migrationtinder.com</p>
            <p style='margin: 20px 0;'><span style='color: #0069b4; margin-right: 15px;'>📱</span> +49 123 456789</p>
            <p style='margin: 20px 0;'><span style='color: #0069b4; margin-right: 15px;'>🌐</span> www.migrationtinder.com</p>
            <p style='margin: 20px 0;'><span style='color: #0069b4; margin-right: 15px;'>🔗</span> linkedin.com/company/migrationtinder</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Logo placeholder
    logo_placeholder = get_placeholder_image(width=200, height=150, text="Migration Tinder Logo", color="#0069b4")
    st.markdown(f"<div style='text-align: center;'><img src='{logo_placeholder}' width='200'></div>", unsafe_allow_html=True)
    
    st.markdown("</div>", unsafe_allow_html=True)

# Now let's add the main function to put it all together
def main():
    # Slide options
    slide_options = [
        "1. Cover",
        "2. Problem",
        "3. Solution",
        "4. Why Now?", 
        "5. Market Size",
        "6. Competition",
        "7. Product",
        "8. Market Validation",
        "9. Business Model",
        "10. Go-To-Market",
        "11. Financials",
        "12. Roadmap",
        "13. Team",
        "14. Ask",
        "15. Contact"
    ]

    # Create sidebar for navigation
    st.sidebar.title("Presentation Navigation")
    selected_slide = st.sidebar.radio("Go to slide:", slide_options)

    # Export button
    if st.sidebar.button("Export to PDF"):
        st.sidebar.info("For a real implementation, this would generate a PDF of the presentation.")
    
    # Footer with slide number
    slide_number = slide_options.index(selected_slide) + 1
    st.markdown(f"""
    <div class="footer">
        Slide {slide_number} of {len(slide_options)} | Migration Tinder | May 2025
    </div>
    """, unsafe_allow_html=True)

    # Display the selected slide
    if selected_slide == "1. Cover":
        cover_slide()
    elif selected_slide == "2. Problem":
        problem_slide()
    elif selected_slide == "3. Solution":
        solution_slide()
    elif selected_slide == "4. Why Now?":
        why_now_slide()
    elif selected_slide == "5. Market Size":
        market_size_slide()
    elif selected_slide == "6. Competition":
        competition_slide()
    elif selected_slide == "7. Product":
        product_slide()
    elif selected_slide == "8. Market Validation":
        market_validation_slide()
    elif selected_slide == "9. Business Model":
        business_model_slide()
    elif selected_slide == "10. Go-To-Market":
        go_to_market_slide()
    elif selected_slide == "11. Financials":
        financials_slide()
    elif selected_slide == "12. Roadmap":
        roadmap_slide()
    elif selected_slide == "13. Team":
        team_slide()
    elif selected_slide == "14. Ask":
        ask_slide()
    elif selected_slide == "15. Contact":
        contact_slide()

    # Add navigation buttons
    st.markdown("<hr>", unsafe_allow_html=True)
    col1, col2 = st.columns([1, 1])

    current_slide_idx = slide_options.index(selected_slide)

    with col1:
        if current_slide_idx > 0:
            prev_slide = slide_options[current_slide_idx - 1]
            if st.button(f"← Previous: {prev_slide}"):
                # This doesn't actually work in Streamlit without session state
                # In a real implementation you would use st.session_state to track and update the current slide
                pass

    with col2:
        if current_slide_idx < len(slide_options) - 1:
            next_slide = slide_options[current_slide_idx + 1]
            if st.button(f"Next: {next_slide} →"):
                # This doesn't actually work in Streamlit without session state
                # In a real implementation you would use st.session_state to track and update the current slide
                pass


def maint():
    try:
        st.write("Testing minimal slide")
        # Test just one slide
        financials_slide()
    except Exception as e:
        st.error(f"Error: {e}")
        st.code(traceback.format_exc())

if __name__ == "__main__":
    main()
