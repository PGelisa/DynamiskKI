// Weather Forecasting Application JavaScript

class WeatherApp {
    constructor() {
        this.currentPhase = 1;
        this.isAnimationPaused = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateTimeline();
        this.setupInformationData();
    }

    bindEvents() {
        // Timeline navigation
        document.querySelectorAll('.timeline-step').forEach(step => {
            step.addEventListener('click', (e) => {
                const phase = parseInt(e.currentTarget.dataset.phase);
                this.navigateToPhase(phase);
            });
        });

        // Phase navigation buttons
        document.getElementById('next-phase')?.addEventListener('click', () => {
            this.navigateToPhase(2);
        });

        document.getElementById('next-phase-2')?.addEventListener('click', () => {
            this.navigateToPhase(3);
        });

        document.getElementById('prev-phase-2')?.addEventListener('click', () => {
            this.navigateToPhase(1);
        });

        document.getElementById('prev-phase-3')?.addEventListener('click', () => {
            this.navigateToPhase(2);
        });

        document.getElementById('restart-journey')?.addEventListener('click', () => {
            this.navigateToPhase(1);
        });

        // Animation controls
        const pauseButton = document.getElementById('pause-animation');
        if (pauseButton) {
            pauseButton.addEventListener('click', (e) => {
                this.toggleAnimation(e.target);
            });
        }

        // Map tabs
        document.querySelectorAll('.map-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchMap(e.target.dataset.map);
            });
        });

        // Info modal triggers - including data center
        document.querySelectorAll('[data-info]').forEach(element => {
            element.addEventListener('click', (e) => {
                const infoType = e.currentTarget.dataset.info;
                this.showModal(infoType);
            });
        });

        // Make data center interactive
        document.querySelector('.data-center')?.addEventListener('click', () => {
            this.showModal('data-center');
        });

        // Modal controls
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('modal-overlay')?.addEventListener('click', () => {
            this.hideModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            } else if (e.key === 'ArrowLeft' && this.currentPhase > 1) {
                this.navigateToPhase(this.currentPhase - 1);
            } else if (e.key === 'ArrowRight' && this.currentPhase < 3) {
                this.navigateToPhase(this.currentPhase + 1);
            } else if (e.key === ' ' && this.currentPhase === 1) {
                e.preventDefault();
                const pauseButton = document.getElementById('pause-animation');
                if (pauseButton) {
                    this.toggleAnimation(pauseButton);
                }
            }
        });
    }

    navigateToPhase(phase) {
        if (phase < 1 || phase > 3) return;

        // Hide current phase
        document.querySelectorAll('.phase-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show new phase with slight delay for smooth transition
        setTimeout(() => {
            document.getElementById(`phase-${phase}`).classList.add('active');
        }, 100);

        // Update timeline
        this.currentPhase = phase;
        this.updateTimeline();

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateTimeline() {
        const steps = document.querySelectorAll('.timeline-step');
        const progress = document.querySelector('.timeline-progress');

        steps.forEach((step, index) => {
            const stepPhase = index + 1;
            if (stepPhase < this.currentPhase) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepPhase === this.currentPhase) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update progress bar
        const progressWidth = ((this.currentPhase - 1) / 2) * 100;
        if (progress) {
            progress.style.width = `${progressWidth}%`;
        }
    }

    toggleAnimation(button) {
        this.isAnimationPaused = !this.isAnimationPaused;
        
        if (this.isAnimationPaused) {
            document.body.classList.add('paused');
            button.innerHTML = '▶️ Fortsett';
            button.classList.remove('btn--secondary');
            button.classList.add('btn--primary');
        } else {
            document.body.classList.remove('paused');
            button.innerHTML = '⏸️ Pause';
            button.classList.remove('btn--primary');
            button.classList.add('btn--secondary');
        }
    }

    switchMap(mapType) {
        // Update tab active state
        document.querySelectorAll('.map-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-map="${mapType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Switch map display
        document.querySelectorAll('.map').forEach(map => {
            map.classList.remove('active');
        });
        const activeMap = document.querySelector(`.${mapType}-map`);
        if (activeMap) {
            activeMap.classList.add('active');
        }
    }

    showModal(infoType) {
        const modal = document.getElementById('info-modal');
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        const info = this.informationData[infoType];
        if (!info) return;

        title.textContent = info.title;
        body.innerHTML = info.content;

        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        
        // Focus management for accessibility
        document.getElementById('close-modal').focus();
    }

    hideModal() {
        document.getElementById('info-modal').classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    setupInformationData() {
        this.informationData = {
            'weather-stations': {
                title: 'Værstasjoner',
                content: `
                    <div class="info-section">
                        <h4>Automatiske værstasjoner</h4>
                        <p>Norge har over 500 automatiske værstasjoner som måler værforholdene døgnet rundt.</p>
                        
                        <h5>Målinger hver 10. minutt:</h5>
                        <ul>
                            <li><strong>Temperatur:</strong> Lufttemperatur i 2 meters høyde</li>
                            <li><strong>Lufttrykk:</strong> Atmosfærisk trykk redusert til havnivå</li>
                            <li><strong>Vind:</strong> Vindhastighet og vindretning i 10 meters høyde</li>
                            <li><strong>Fuktighet:</strong> Relativ luftfuktighet</li>
                            <li><strong>Nedbør:</strong> Mengde og type nedbør</li>
                            <li><strong>Sikt:</strong> Synlighetsforhold</li>
                        </ul>
                        
                        <p>Stasjonene sender data i sanntid via mobilnett eller satellittforbindelse til Meteorologisk institutt.</p>
                    </div>
                `
            },
            'radiosondes': {
                title: 'Radiosondeballonger',
                content: `
                    <div class="info-section">
                        <h4>Værballonger som måler atmosfæreprofiler</h4>
                        <p>Radiosondeballonger gir oss kritisk informasjon om atmosfæren i alle høyder.</p>
                        
                        <h5>Tekniske detaljer:</h5>
                        <ul>
                            <li><strong>Høyde:</strong> Stiger til 30-35 km høyde før ballongen sprekker</li>
                            <li><strong>Oppstigning:</strong> 5 m/s vertikal hastighet</li>
                            <li><strong>Frekvens:</strong> 2 ganger daglig klokka 00 og 12 UTC</li>
                            <li><strong>Varighet:</strong> Ca. 2 timer per oppsending</li>
                        </ul>
                        
                        <h5>Målinger underveis:</h5>
                        <ul>
                            <li>Temperatur og fuktighet i alle høyder</li>
                            <li>Lufttrykk som funksjon av høyde</li>
                            <li>Vindhastighet og vindretning (via GPS-posisjon)</li>
                            <li>GPS-koordinater for nøyaktig posisjonering</li>
                        </ul>
                        
                        <p>Disse dataene er essensielle for å initialisere værmodellene med korrekte atmosfæreprofiler.</p>
                    </div>
                `
            },
            'radar': {
                title: 'Værradar',
                content: `
                    <div class="info-section">
                        <h4>Doppler-radar teknologi</h4>
                        <p>Værradarer bruker radiobølger for å detektere nedbør og vindmønster i sanntid.</p>
                        
                        <h5>Tekniske spesifikasjoner:</h5>
                        <ul>
                            <li><strong>Frekvens:</strong> 24 GHz (Ka-bånd)</li>
                            <li><strong>Rekkevidde:</strong> 70-250 km radius</li>
                            <li><strong>Oppdatering:</strong> Hvert 5-15 minutt</li>
                            <li><strong>Oppløsning:</strong> 1-2 km horisontalt</li>
                        </ul>
                        
                        <h5>Målinger:</h5>
                        <ul>
                            <li><strong>Reflektans:</strong> Intensitet av nedbør</li>
                            <li><strong>Doppler-hastighet:</strong> Bevegelse av nedbørpartikler</li>
                            <li><strong>Nedbørtype:</strong> Regn, snø, sludd eller hagl</li>
                            <li><strong>Vindmønster:</strong> Fra partiklenes bevegelse</li>
                        </ul>
                        
                        <p>Doppler-teknologien gjør det mulig å oppdage vindskjær, turbulens og til og med tornadoer.</p>
                    </div>
                `
            },
            'satellites': {
                title: 'Værsatellitter',
                content: `
                    <div class="info-section">
                        <h4>EUMETSAT Meteosat Third Generation</h4>
                        <p>Geostasjonære satellitter som overvåker Europa og Afrika fra 36 000 km høyde.</p>
                        
                        <h5>Satellittsystemet:</h5>
                        <ul>
                            <li><strong>Posisjon:</strong> 36 000 km over ekvator (0° lengdegrad)</li>
                            <li><strong>Oppdatering:</strong> Full skive hvert 15. minutt</li>
                            <li><strong>Europa:</strong> Hvert 2.5 minutt</li>
                            <li><strong>Spektralkanaler:</strong> 16 ulike bølgelengder</li>
                        </ul>
                        
                        <h5>Observasjoner:</h5>
                        <ul>
                            <li><strong>Skydekning:</strong> Type og høyde av skyer</li>
                            <li><strong>Overflatetemperatur:</strong> Hav og landområder</li>
                            <li><strong>Atmosfærisk fuktighet:</strong> Vanndamp i ulike høyder</li>
                            <li><strong>Lyn:</strong> Aktivitet i tordenvær</li>
                            <li><strong>Aerosoler:</strong> Støvpartikler og forurensning</li>
                        </ul>
                        
                        <p>Satellittdata er spesielt viktig for områder med få bakkestasjoner, som over havet og i polare strøk.</p>
                    </div>
                `
            },
            'data-center': {
                title: 'Datasenter',
                content: `
                    <div class="info-section">
                        <h4>Sanntidsinnsamling av værdata</h4>
                        <p>Meteorologisk institutts datasentere mottar og prosesserer værdata fra tusenvis av kilder døgnet rundt.</p>
                        
                        <h5>Datastrømmer:</h5>
                        <ul>
                            <li><strong>Værstasjoner:</strong> Over 500 stasjoner i Norge</li>
                            <li><strong>Radiosondeballonger:</strong> Fra 40+ steder i Europa</li>
                            <li><strong>Radarer:</strong> 15 værradarer i Norge</li>
                            <li><strong>Satellitter:</strong> EUMETSAT og NOAA-data</li>
                            <li><strong>Internasjonale data:</strong> Fra 10,000+ stasjoner globalt</li>
                        </ul>
                        
                        <h5>Databehandling:</h5>
                        <ul>
                            <li><strong>Kvalitetskontroll:</strong> Automatisk fjerning av feil</li>
                            <li><strong>Formatkonvertering:</strong> Standardisering av dataformater</li>
                            <li><strong>Distribuering:</strong> Videreføring til værmodellene</li>
                            <li><strong>Arkivering:</strong> Lagring for klimaforskning</li>
                        </ul>
                        
                        <h5>Teknisk infrastruktur:</h5>
                        <p>Datasenteret håndterer over 50 GB værdata hver dag og må være operativt 24/7. Redundante systemer sikrer at kritiske værvarsler alltid kommer fram.</p>
                    </div>
                `
            },
            'yr-no': {
                title: 'Yr.no',
                content: `
                    <div class="info-section">
                        <h4>Norges offisielle værportal</h4>
                        <p>Yr.no er et samarbeid mellom NRK og Meteorologisk institutt, og gir værmeldinger til millioner av brukere.</p>
                        
                        <h5>Tjenester:</h5>
                        <ul>
                            <li><strong>Stedsvarsel:</strong> Time-for-time prognoser</li>
                            <li><strong>Radar:</strong> Sanntids nedbørbilder</li>
                            <li><strong>Varsler:</strong> Farevarsler for ekstremvær</li>
                            <li><strong>Langtidsvarsel:</strong> 9-dagers prognose</li>
                        </ul>
                        
                        <h5>Brukervennlige symboler:</h5>
                        <p>Komplekse værdata forenkles til intuitive symboler som sol, skyer, regn og snø. Temperaturer og vindstyrke presenteres på en lett forståelig måte.</p>
                        
                        <h5>Datakvalitet:</h5>
                        <p>Yr.no bruker samme data som meteorologene, men tilpasser presentasjonen for allmennheten. Automatiske algoritmer velger de mest relevante værparametrene for hver bruker.</p>
                    </div>
                `
            },
            'aviation': {
                title: 'Luftfartsvarsler',
                content: `
                    <div class="info-section">
                        <h4>Spesialiserte varsler for flytrafikk</h4>
                        <p>Luftfarten har strenge krav til nøyaktighet og oppdateringsfrekvens.</p>
                        
                        <h5>METAR og TAF:</h5>
                        <ul>
                            <li><strong>METAR:</strong> Observasjoner fra flyplasser hver time</li>
                            <li><strong>TAF:</strong> Detaljerte prognoser for flyplasser</li>
                            <li><strong>SIGMET:</strong> Varsler om farlige værforhold</li>
                            <li><strong>Vindmeldinger:</strong> Presise vindprognoser for landing</li>
                        </ul>
                        
                        <h5>Kritiske parametere:</h5>
                        <ul>
                            <li>Sikt og tåke</li>
                            <li>Vindskjær og turbulens</li>
                            <li>Ising (isdannelse på fly)</li>
                            <li>Tordenvær og lyn</li>
                        </ul>
                    </div>
                `
            },
            'maritime': {
                title: 'Sjøfartsvarsler',
                content: `
                    <div class="info-section">
                        <h4>Marine værmeldinger</h4>
                        <p>Spesialiserte prognoser for skip og offshore-virksomhet.</p>
                        
                        <h5>Marine parametere:</h5>
                        <ul>
                            <li><strong>Bølgehøyde:</strong> Signifikant bølgehøyde</li>
                            <li><strong>Vindstyrke:</strong> Beaufort-skala</li>
                            <li><strong>Sikt:</strong> Navigasjonssikt</li>
                            <li><strong>Isforhold:</strong> Sjøis og isdrift</li>
                        </ul>
                        
                        <h5>Spesialområder:</h5>
                        <ul>
                            <li>Norskekysten og fjorder</li>
                            <li>Nordsjøen og Norskehavet</li>
                            <li>Barentshavet og Svalbard</li>
                            <li>Offshoreinstallasjonor</li>
                        </ul>
                    </div>
                `
            },
            'warnings': {
                title: 'Farevarsler',
                content: `
                    <div class="info-section">
                        <h4>Varsler ved ekstremvær</h4>
                        <p>Meteorologisk institutt utsteder farevarsler når været kan medføre skade på personer eller eiendom.</p>
                        
                        <h5>Farenivåer:</h5>
                        <ul>
                            <li><strong>Gult:</strong> Værsituasjon som krever oppmerksomhet</li>
                            <li><strong>Oransje:</strong> Farlig vær - vær forberedt</li>
                            <li><strong>Rødt:</strong> Svært farlig vær - ikke reis</li>
                        </ul>
                        
                        <h5>Værfenomener:</h5>
                        <ul>
                            <li>Storm og orkan</li>
                            <li>Kraftig nedbør og flom</li>
                            <li>Snøstorm og snøfokk</li>
                            <li>Ekstreme temperaturer</li>
                            <li>Tordenvær og lyn</li>
                            <li>Is og underkjølt regn</li>
                        </ul>
                        
                        <p>Varsler sendes via NRK, media, SMS og push-varsler til berørte områder.</p>
                    </div>
                `
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherApp();
    
    // Enhanced map interactions
    setTimeout(() => {
        // Add click handlers for pressure systems
        document.querySelectorAll('.pressure-system').forEach(system => {
            system.addEventListener('click', function() {
                const isHigh = this.classList.contains('high');
                const pressure = this.querySelector('.pressure-value').textContent;
                
                const info = isHigh 
                    ? `<h4>Høytrykk (${pressure} hPa)</h4><p>Høytrykk gir normalt pent vær med lite skyer og svak vind. Luften synker ned fra høyere lag og varmes opp, noe som forhindrer skydannelse.</p>`
                    : `<h4>Lavtrykk (${pressure} hPa)</h4><p>Lavtrykk bringer ofte dårlig vær med skyer, nedbør og sterk vind. Luften stiger opp og kjøles ned, som fører til skydannelse og nedbør.</p>`;
                
                showQuickInfo(info, this);
            });
        });

        // Add click handler for jet stream
        document.querySelector('.jet-stream')?.addEventListener('click', function() {
            const info = `<h4>Jetstrøm (300 hPa-nivå)</h4><p>Jetstrømmen er en smal luftstrøm på 9-10 km høyde med vindhastigheter over 120 knop. Den styrer hvordan værsystemer beveger seg og er kritisk for langdistansefly.</p>`;
            showQuickInfo(info, this);
        });
    }, 500);
});

// Additional utility functions for enhanced interactivity

// Smooth reveal animation for elements
function revealOnScroll() {
    const elements = document.querySelectorAll('.source-item, .process-step, .channel-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Throttled scroll event listener
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(revealOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    ticking = false;
    requestTick();
});

// Quick info tooltip function
function showQuickInfo(content, element) {
    // Remove existing tooltips
    document.querySelectorAll('.quick-tooltip').forEach(tooltip => tooltip.remove());
    
    const tooltip = document.createElement('div');
    tooltip.className = 'quick-tooltip';
    tooltip.innerHTML = content;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top - 10}px`;
    tooltip.style.left = `${rect.right + 10}px`;
    tooltip.style.background = 'var(--color-surface)';
    tooltip.style.border = '1px solid var(--color-border)';
    tooltip.style.borderRadius = 'var(--radius-base)';
    tooltip.style.padding = 'var(--space-12)';
    tooltip.style.maxWidth = '250px';
    tooltip.style.zIndex = '100';
    tooltip.style.boxShadow = 'var(--shadow-md)';
    tooltip.style.fontSize = 'var(--font-size-sm)';
    tooltip.style.color = 'var(--color-text)';
    
    document.body.appendChild(tooltip);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        tooltip.remove();
    }, 5000);
    
    // Remove on click outside
    const removeTooltip = (e) => {
        if (!tooltip.contains(e.target) && e.target !== element) {
            tooltip.remove();
            document.removeEventListener('click', removeTooltip);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', removeTooltip);
    }, 100);
}

// Keyboard shortcuts info
document.addEventListener('keydown', (e) => {
    if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const shortcutsInfo = `
            <h4>Hurtigtaster</h4>
            <ul style="list-style: none; padding: 0;">
                <li><kbd>←</kbd> / <kbd>→</kbd> - Naviger mellom faser</li>
                <li><kbd>Mellomrom</kbd> - Pause/fortsett animasjoner (fase 1)</li>
                <li><kbd>Esc</kbd> - Lukk modal</li>
                <li><kbd>Ctrl + ?</kbd> - Vis denne hjelpen</li>
            </ul>
        `;
        showQuickInfo(shortcutsInfo, document.body);
    }
});

// Add CSS for enhanced styling
const style = document.createElement('style');
style.textContent = `
    kbd {
        background-color: var(--color-secondary);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        padding: 2px 6px;
        font-family: var(--font-family-mono);
        font-size: var(--font-size-xs);
    }
    
    .quick-tooltip h4 {
        margin: 0 0 var(--space-8) 0;
        font-size: var(--font-size-md);
    }
    
    .quick-tooltip p {
        margin: 0;
        line-height: 1.4;
    }
    
    .quick-tooltip ul {
        margin: var(--space-8) 0 0 0;
    }
    
    .quick-tooltip li {
        margin-bottom: var(--space-4);
        display: flex;
        align-items: center;
        gap: var(--space-8);
    }
    
    .revealed {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    .data-center {
        cursor: pointer;
        transition: all var(--duration-normal) var(--ease-standard);
    }
    
    .data-center:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);