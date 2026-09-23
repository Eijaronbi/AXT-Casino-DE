export type InfoSection = { title: string; body: string };

export const pageTitles: Record<string, string> = {
  'about-us': 'Über uns', support: 'Hilfezentrum', faq: 'Häufige Fragen',
  'responsible-gambling': 'Verantwortungsbewusstes Spielen', 'terms-and-conditions': 'Allgemeine Geschäftsbedingungen',
  'privacy-policy': 'Datenschutzrichtlinie', 'cookie-policy': 'Cookie-Richtlinie', complaints: 'Beschwerden',
  'aml-policy': 'AML-Richtlinie', 'bonus-terms-and-conditions': 'Bonusbedingungen',
};

export const infoPages: Record<string, InfoSection[]> = {
  'about-us': [
    { title: 'Die besten Spiele', body: 'Entdecke eine große Auswahl an Slots, Tischspielen, Live-Casino-Titeln, Jackpots und Sofortgewinnen von führenden Studios im AXT Casino.' },
    { title: 'Schnelle Auszahlungen', body: 'Eine klare Kasse macht Einzahlungen und Auszahlungsanfragen einfach verständlich.' },
    { title: 'Großzügige Belohnungen', body: 'Willkommensangebote, tägliche Belohnungen, Missionen, Turniere und VIP-Vorteile bieten mehr Wege, den Katalog zu genießen.' },
    { title: 'Mehrere Währungen', body: 'Die Oberfläche unterstützt beliebte Währungen und Zahlungsmethoden für Spieler in unterstützten Regionen.' },
    { title: 'Support rund um die Uhr', body: 'Der Support ist rund um die Uhr über das Hilfeformular und den Live-Support erreichbar.' },
    { title: 'Lizenz und Sicherheit', body: 'AXT Casino steht für ein sicheres, verantwortungsbewusstes Unterhaltungserlebnis. Dieser Bildungs-Build verarbeitet keine echten Konten oder Zahlungen.' },
  ],
  faq: [
    { title: 'Konto', body: 'Nutze Registrieren, um die Registrierungs-Demo zu öffnen. Anmeldung, Passwort-Wiederherstellung und Kontoerstellung sind in diesem Frontend-Build nur lokale Demonstrationen.' },
    { title: 'Einzahlungsmethoden', body: 'Die Seite Zahlungen listet die unterstützten Methoden. In dieser Bildungsversion sind keine Ein- oder Auszahlungen möglich.' },
    { title: 'Spiele', body: 'Stöbere nach Kategorie oder Anbieter, durchsuche den Beispielkatalog und öffne Spielevorschauen aus dem Raster.' },
    { title: 'Sicherheit', body: 'Formulare übertragen keine persönlichen Daten. Der einzige lokal gespeicherte Wert ist die Cookie-Hinweis-Präferenz.' },
  ],
  'responsible-gambling': [
    { title: '1. Allgemeines', body: 'Spielen soll Unterhaltung bleiben. Setze klare Limits für Zeit und Ausgaben und jage niemals Verlusten hinterher.' },
    { title: '2. Hilfe bei problematischem Spielverhalten', body: 'Wenn das Spiel keinen Spaß mehr macht, pausiere und suche vertrauliche Hilfe bei einer anerkannten Organisation für verantwortungsbewusstes Spielen.' },
    { title: '3. Persönliche Limits', body: 'Nutze Einzahlungs-, Verlust-, Einsatz- und Sitzungslimits sowie Auszeiten oder Selbstsperre bei Bedarf.' },
    { title: '4. Externe Hilfe', body: 'Unabhängige Organisationen wie Gambling Therapy und Gordon Moody bieten praktische, vertrauliche Unterstützung.' },
    { title: '5. Schutz von Minderjährigen', body: 'Casino-Dienste sind nur für Erwachsene bestimmt, die das gesetzliche Mindestalter in ihrer Gerichtsbarkeit erfüllen.' },
  ],
  'terms-and-conditions': ['Allgemeine Informationen','Teilnahmeberechtigung und Einschränkungen','Spielverfügbarkeit und Einschränkungen','Zahlungen und Währungen','Steuern und Gebühren','Spielregeln','Haftungsausschluss','Nutzung des Spielerkontos','Anti-Betrugs-Richtlinie','Einzahlungen','Auszahlungsrichtlinie','Inaktive Konten','Ablaufzeitraum','Rückerstattungsrichtlinie','Beschwerden','Nicht-Übertragbarkeit','Schiedsverfahren','KYC und Kontoverifizierung'].map((title,index)=>({title:`${index+1}. ${title}`,body:'Diese Bildungsnachbildung bietet kein Echtgeldspiel, erstellt keine Konten und akzeptiert keine Zahlungen. Ein Produktionsdienst muss gerichtsbarkeitsspezifische Bedingungen veröffentlichen, die von qualifizierten Rechtsberatern geprüft wurden.'})),
  'privacy-policy': ['Allgemeine Informationen','Über uns','Datenkategorien','Verarbeitungszwecke','Datenquellen','Offenlegung von Informationen','Internationale Übertragungen','Datenspeicherung','Einwilligung und deine Rechte','Automatisierte Entscheidungsfindung','Datensicherheit','Richtlinienänderungen','Kontaktinformationen'].map((title,index)=>({title:`${index+1}. ${title}`,body:'Diese Frontend-Demo sendet keine Formulardaten an einen Server. Eine Produktions-Datenschutzrichtlinie muss Betreiber, Auftragsverarbeiter, Speicherfristen, Rechtsgrundlagen und Nutzerrechte korrekt beschreiben.'})),
  'cookie-policy': [{title:'Wie Cookies verwendet werden',body:'Diese Nachbildung nutzt nur lokalen Speicher, um zu merken, ob der Cookie-Hinweis geschlossen wurde. Sie enthält keine Analyse- oder Werbe-Tracker.'},{title:'Präferenzen verwalten',body:'Lösche die Website-Daten in deinem Browser, um den Hinweis wiederherzustellen und die gespeicherte Präferenz zu entfernen.'}],
  complaints: [{title:'So kontaktierst du uns',body:'Nutze die Seite Hilfezentrum, um eine Nachricht vorzubereiten. Das Bildungsformular sendet keine Daten; ein Produktionsdienst würde einen nachverfolgbaren Beschwerdeprozess bereitstellen.'},{title:'Was du angeben solltest',body:'Beschreibe das Problem, relevante Daten und das gewünschte Ergebnis. Sende keine Passwörter oder Zahlungsdaten.'}],
  'aml-policy': [{title:'Zweck',body:'Ein Produktionsbetreiber sollte risikobasierte Kontrollen zur Verhinderung von Geldwäsche und Terrorismusfinanzierung unterhalten.'},{title:'Verifizierung und Überwachung',body:'Angemessene Identitätsprüfungen, Transaktionsüberwachung, Aufbewahrung und regulatorische Meldungen müssen dem geltenden Recht folgen.'}],
  'bonus-terms-and-conditions': [{title:'Bonusberechtigung',body:'Aktionen in dieser Bildungsnachbildung sind visuelle Beispiele und können nicht beansprucht werden.'},{title:'Umsatz und Ablauf',body:'Eine Produktionsaktion muss Berechtigung, Umsatz, Ablauf, ausgeschlossene Spiele, Maximaleinsätze und Auszahlungsbedingungen klar angeben.'}],
};
