// Weather Forecasting Application JavaScript - FIXED

class WeatherApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupModalData();
        this.updateProgress();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Navigation buttons - FIX: Proper event handling
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentStep === this.totalSteps) {
                this.goToStep(1);
            } else {
                this.nextStep();
            }
        });
        
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevStep();
        });

        // Sidebar navigation
        document.querySelectorAll('.nav-step').forEach(step => {
            step.addEventListener('click', (e) => {
                const stepNumber = parseInt(e.currentTarget.dataset.step);
                this.goToStep(stepNumber);
            });
        });

        // Modal functionality
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('infoModal').addEventListener('click', (e) => {
            if (e.target.id === 'infoModal') {
                this.closeModal();
            }
        });

        // FIX: Use event delegation for clickable SVG elements
        document.addEventListener('click', (e) => {
            // Check if clicked element or its parent has .clickable class
            let target = e.target;
            while (target && target !== document) {
                if (target.classList && target.classList.contains('clickable')) {
                    const infoType = target.dataset.info;
                    if (infoType) {
                        this.showModal(infoType);
                        return;
                    }
                }
                target = target.parentNode;
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextStep();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevStep();
            } else if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupModalData() {
        this.modalData = {
            // Step 1 - Observation Sources
            bakkestasjoner: {
                title: "Bakkestasjoner",
                content: `
                    <p><strong>Automatiske værstasjoner</strong> måler kontinuerlig:</p>
                    <ul>
                        <li>Temperatur og luftfuktighet</li>
                        <li>Vindstyrke og vindretning</li>
                        <li>Lufttrykk</li>
                        <li>Nedbørsmengde</li>
                        <li>Snødybde (vinterstid)</li>
                    </ul>
                    <p>Norge har over 300 automatiske værstasjoner som sender data hver time til Meteorologisk institutt.</p>
                `
            },
            radiosonder: {
                title: "Værballonger / Radiosonder",
                content: `
                    <p><strong>Værballonger</strong> sendes opp to ganger daglig (00 og 12 UTC) fra ~800 stasjoner globalt.</p>
                    <p>Ballongene bærer instrumenter som måler:</p>
                    <ul>
                        <li>Temperaturprofil gjennom atmosfæren</li>
                        <li>Luftfuktighet på ulike høyder</li>
                        <li>Vindstyrke og vindretning</li>
                        <li>Lufttrykk som funksjon av høyde</li>
                    </ul>
                    <p>Data samles opp til 30-35 km høyde før ballongen sprekker.</p>
                `
            },
            radar: {
                title: "Værradar",
                content: `
                    <p><strong>Døpplerradar</strong> sender ut radiobølger som reflekteres av nedbørspartikler.</p>
                    <p>Radaren kan detektere:</p>
                    <ul>
                        <li>Nedbørsintensitet og -type</li>
                        <li>Vindshear og turbulens</li>
                        <li>Tornadoer og superceller</li>
                        <li>Bevegelse av værsystemer</li>
                    </ul>
                    <p>Norske værradarer oppdateres hvert 5-15 minutt og har en rekkevidde på 250-500 km.</p>
                `
            },
            satellitter: {
                title: "Værsatellitter",
                content: `
                    <p><strong>Polære og geostasjonære satellitter</strong> gir global atmosfæreovervåkning 24/7.</p>
                    <p>Satelittinstrumenter måler:</p>
                    <ul>
                        <li>Temperaturprofiler i atmosfæren</li>
                        <li>Fuktighetsfordeling</li>
                        <li>Skydekke og skytype</li>
                        <li>Vindmønstre fra skyenes bevegelse</li>
                        <li>Havoverflatetemperatur</li>
                    </ul>
                    <p>Satellittdata er spesielt viktig over hav hvor det er få andre observasjoner.</p>
                `
            },

            // Step 2 - Data Processing
            dataassimilering: {
                title: "Dataassimilering",
                content: `
                    <p><strong>Dataassimilering</strong> kombinerer observasjoner med modellbakgrunn for å lage det beste estimatet av atmosfærens tilstand.</p>
                    <p>Prosessen inkluderer:</p>
                    <ul>
                        <li>Kvalitetskontroll av observasjoner</li>
                        <li>Fjerning av systematiske feil</li>
                        <li>Optimal blanding av observasjoner og modell</li>
                        <li>Statistiske metoder som 4D-Var eller Kalman-filter</li>
                    </ul>
                    <p>Resultatet er analysekart som viser atmosfærens 3D-tilstand på et bestemt tidspunkt.</p>
                `
            },

            // Step 3 - Weather Models
            ecmwf: {
                title: "ECMWF - Europeisk senter for værprognoser",
                content: `
                    <p><strong>ECMWF</strong> (European Centre for Medium-Range Weather Forecasts) er verdens ledende globale værmodell.</p>
                    <p>Spesifikasjoner:</p>
                    <ul>
                        <li>Oppløsning: ~9 km horisontalt, 137 vertikale lag</li>
                        <li>Prognoseperiode: 10 dager (15 dager for ensemble)</li>
                        <li>Kjøres 2 ganger daglig (00 og 12 UTC)</li>
                        <li>Ensemble med 51 medlemmer for usikkerhetsestimering</li>
                    </ul>
                    <p>ECMWF-data brukes av værinstitutt over hele verden, inkludert met.no.</p>
                `
            },
            arome: {
                title: "AROME-Arctic - Regional arktisk modell",
                content: `
                    <p><strong>AROME-Arctic</strong> er en høyoppløselig regional værmodell optimalisert for arktiske forhold.</p>
                    <p>Spesifikasjoner:</p>
                    <ul>
                        <li>Oppløsning: 2.5 km horisontalt</li>
                        <li>Dekker Arktis, inkludert Svalbard</li>
                        <li>Prognoseperiode: 66 timer</li>
                        <li>Spesialisert på polare lavtrykk</li>
                        <li>Bedre håndtering av is og snø</li>
                    </ul>
                    <p>Viktig for værvarsling på Svalbard og i nordlige havområder.</p>
                `
            },
            meps: {
                title: "MEPS - MetCoOp Ensemble System",
                content: `
                    <p><strong>MEPS</strong> er et ensemble-system utviklet av Norge, Sverige, Finland og Danmark.</p>
                    <p>Spesifikasjoner:</p>
                    <ul>
                        <li>Oppløsning: 2.5 km horisontalt</li>
                        <li>25 ensemble-medlemmer</li>
                        <li>Prognoseperiode: 66 timer</li>
                        <li>Dekker Norden og tilgrensende havområder</li>
                        <li>Gir sannsynlighetsbaserte prognoser</li>
                    </ul>
                    <p>Ensemble-prognoser viser hvor usikre prognosene er.</p>
                `
            },

            // Step 4 - Surface Analysis
            høytrykk: {
                title: "Høytrykk (Antisklon)",
                content: `
                    <p><strong>Høytrykk</strong> er områder med høyt lufttrykk ved jordoverflaten (typisk over 1013 hPa).</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Luften synker ned fra høyden</li>
                        <li>Sirkulasjon med klokken (nordlige halvkule)</li>
                        <li>Svake vinder i sentrum</li>
                        <li>Klarvær eller lett skydekke</li>
                        <li>Stabil værsituasjon</li>
                    </ul>
                    <p>Høytrykk gir vanligvis pent vær, men kan også gi tåke vinterstid.</p>
                `
            },
            lavtrykk: {
                title: "Lavtrykk (Syklon)",
                content: `
                    <p><strong>Lavtrykk</strong> er områder med lavt lufttrykk ved jordoverflaten (typisk under 1013 hPa).</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Luften stiger opp fra overflaten</li>
                        <li>Sirkulasjon mot klokken (nordlige halvkule)</li>
                        <li>Sterke vinder, spesielt nær sentrum</li>
                        <li>Skyer og nedbør</li>
                        <li>Ustabil værsituasjon</li>
                    </ul>
                    <p>Lavtrykk bringer regn, snø og sterk vind. Dype lavtrykk kan gi storm.</p>
                `
            },
            kaldfront: {
                title: "Kaldfront",
                content: `
                    <p><strong>Kaldfront</strong> markerer grensen hvor kald luftmasse trenger inn under varm luftmasse.</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Bratt frontalhelning (~1:50)</li>
                        <li>Kraftig oppstigende bevegelse</li>
                        <li>Tordenvær og byger</li>
                        <li>Temperaturfall og vindskifte</li>
                        <li>Korte, intense nedbørepisoder</li>
                    </ul>
                    <p>Symboliseres med trekanter som peker mot den varme luftmassen.</p>
                `
            },
            varmfront: {
                title: "Varmfront",
                content: `
                    <p><strong>Varmfront</strong> markerer grensen hvor varm luftmasse glir oppover kald luftmasse.</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Slak frontalhelning (~1:100)</li>
                        <li>Langsom oppstigende bevegelse</li>
                        <li>Langvarig, moderat nedbør</li>
                        <li>Temperaturstigning</li>
                        <li>Lagskyer over store områder</li>
                    </ul>
                    <p>Symboliseres med halvsirkler som peker mot den kalde luftmassen.</p>
                `
            },

            // Step 5 - Upper Level
            rygg: {
                title: "Jetstrømrygg (Ridge)",
                content: `
                    <p><strong>Rygg</strong> er hvor jetstrømmen bøyer nordover og danner en "bølgetopp".</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Divergens i jetstrømmen</li>
                        <li>Luften synker i høyden</li>
                        <li>Høy geopotensiell høyde</li>
                        <li>Lavere jetstrømshastighet</li>
                        <li>Høytrykk ved bakken</li>
                    </ul>
                    <p>Rygger gir vanligvis pent og stabilt vær ved jordoverflaten.</p>
                `
            },
            tråg: {
                title: "Jetstrømtråg (Trough)",
                content: `
                    <p><strong>Tråg</strong> er hvor jetstrømmen bøyer sørover og danner en "bølgedal".</p>
                    <p>Karakteristika:</p>
                    <ul>
                        <li>Konvergens i jetstrømmen</li>
                        <li>Luften stiger i høyden</li>
                        <li>Lav geopotensiell høyde</li>
                        <li>Høyere jetstrømshastighet</li>
                        <li>Lavtrykk ved bakken</li>
                    </ul>
                    <p>Tråg fører til utvikling av lavtrykk og ustabilt vær ved jordoverflaten.</p>
                `
            },

            // Step 6 - Communication
            publikum: {
                title: "Værmelding til publikum",
                content: `
                    <p><strong>Værmeldinger</strong> til allmennheten formidles gjennom mange kanaler:</p>
                    <ul>
                        <li>TV og radio (NRK, TV 2)</li>
                        <li>Internett (yr.no, met.no)</li>
                        <li>Mobilapper</li>
                        <li>Sosiale medier</li>
                    </ul>
                    <p>Informasjonen forenkles og tilpasses ikke-fagfolk med fokus på:</p>
                    <ul>
                        <li>Temperatur og følt temperatur</li>
                        <li>Nedbørssannsynlighet</li>
                        <li>Vindforhold</li>
                        <li>Farevarsler</li>
                    </ul>
                `
            },
            luftfart: {
                title: "Værtjenester for luftfart",
                content: `
                    <p><strong>Luftfarten</strong> har strenge krav til værinformasjon for sikker flyging:</p>
                    <ul>
                        <li><strong>TAF:</strong> Terminal Aerodrome Forecast - flyplassprognose</li>
                        <li><strong>METAR:</strong> Aktuelle værforhold på flyplasser</li>
                        <li><strong>SIGMET:</strong> Varsler om farlige værfenomener</li>
                        <li><strong>Høydevindprognoser</strong> for ruteplanlegging</li>
                    </ul>
                    <p>Spesiell fokus på ising, turbulens, tåke og sterk vind.</p>
                `
            },
            sjøfart: {
                title: "Maritime værtjenester",
                content: `
                    <p><strong>Sjøfarten</strong> er avhengig av detaljerte havværmeldinger:</p>
                    <ul>
                        <li>Vindstyrke og vindretning</li>
                        <li>Bølgehøyde og bølgeperiode</li>
                        <li>Sikt og nedbør</li>
                        <li>Stormvarsler og fareområder</li>
                    </ul>
                    <p>Norge sender ut havværmeldinger for norske farvann og Nordsjøen flere ganger daglig.</p>
                `
            },
            landbruk: {
                title: "Værtjenester for landbruk",
                content: `
                    <p><strong>Landbruket</strong> bruker værdata for optimal drift:</p>
                    <ul>
                        <li>Vekstsesongsvarsel</li>
                        <li>Frostadvarsler</li>
                        <li>Nedbørsprognoser for vanning</li>
                        <li>Vindforhold for sprøyting</li>
                        <li>Tørkevarsel</li>
                    </ul>
                    <p>Spesialiserte agrometerologiske tjenester hjelper bønder optimalisere avlinger og redusere tap.</p>
                `
            },
            kraftindustri: {
                title: "Værtjenester for kraftindustri",
                content: `
                    <p><strong>Kraftindustrien</strong> er avhengig av nøyaktige værprognoser for:</p>
                    <ul>
                        <li><strong>Vindkraft:</strong> Vindprognoser for produksjonsplanlegging</li>
                        <li><strong>Vannkraft:</strong> Nedbørsprognoser og snøsmelting</li>
                        <li><strong>Kraftledninger:</strong> Ising og sterk vind</li>
                        <li><strong>Forbruksprognoser:</strong> Temperatur påvirker strømforbruk</li>
                    </ul>
                    <p>Nøyaktige prognoser er kritisk for kraftbalanse og nettsstabilitet.</p>
                `
            },
            ekstremvarsler: {
                title: "Ekstremværvarsler",
                content: `
                    <p><strong>Ekstremværvarsler</strong> utsendes ved fare for liv og materielle skader:</p>
                    <ul>
                        <li><strong>Gult nivå:</strong> Fare for forstyrrelser</li>
                        <li><strong>Oransje nivå:</strong> Fare for skader</li>
                        <li><strong>Rødt nivå:</strong> Ekstrem fare</li>
                    </ul>
                    <p>Varseltypene inkluderer:</p>
                    <ul>
                        <li>Storm og orkan</li>
                        <li>Flom og oversvømmelse</li>
                        <li>Skred og snøskred</li>
                        <li>Ekstreme temperaturer</li>
                        <li>Is og kraftig snøfall</li>
                    </ul>
                `
            }
        };
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateView();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateView();
        }
    }

    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
            this.updateView();
        }
    }

    updateView() {
        this.updateStepContent();
        this.updateNavigation();
        this.updateProgress();
        this.updateStepIndicator();
    }

    updateStepContent() {
        // Hide all step content
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show current step content
        const currentContent = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentContent) {
            currentContent.classList.add('active');
        }
    }

    updateNavigation() {
        // Update sidebar navigation
        document.querySelectorAll('.nav-step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });

        // Update button states
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn && nextBtn) {
            // Update button text for last step
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = '<span class="button-icon">↻</span> Start på nytt';
            } else {
                nextBtn.innerHTML = 'Neste <span class="button-icon">→</span>';
            }
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const percentage = (this.currentStep / this.totalSteps) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    }

    updateStepIndicator() {
        const currentStepElement = document.querySelector('.current-step');
        const totalStepsElement = document.querySelector('.total-steps');
        
        if (currentStepElement) {
            currentStepElement.textContent = this.currentStep;
        }
        if (totalStepsElement) {
            totalStepsElement.textContent = this.totalSteps;
        }
    }

    showModal(infoType) {
        const modal = document.getElementById('infoModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (this.modalData[infoType]) {
            modalTitle.textContent = this.modalData[infoType].title;
            modalBody.innerHTML = this.modalData[infoType].content;
            modal.style.display = 'flex';
            
            // Focus the modal for accessibility
            modal.focus();
            
            // Trap focus in modal
            this.trapFocus(modal);
        }
    }

    closeModal() {
        const modal = document.getElementById('infoModal');
        modal.style.display = 'none';
    }

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Force redraw of SVG elements if needed
    const svgs = document.querySelectorAll('.main-svg');
    svgs.forEach(svg => {
        const display = svg.style.display;
        svg.style.display = 'none';
        svg.offsetHeight; // Trigger reflow
        svg.style.display = display;
    });
});
