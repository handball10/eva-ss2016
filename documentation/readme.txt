Allgemein:
Von mir angelegte Struktur: Inhalte stehen im Ordner "content", "settings" einfach ignorieren, da sind alle Layouteinstellungen drin.
Eine Bitte: immer fleißig unter Versions zwischenspeichern, damit uns nix verloren geht. Ab und zu vielleicht auch mal über „Download as ZIP“ eine lokale Kopie speichern.

Zur Nutzung von LaTeX:

Kapitel anfangen: \chapter[Text im Inhaltsverzeichnis]{Titel}
Abschnitt anfangen: \section[Text im Inhaltsverzeichnis]{Titel}
Unterabschnitt anfangen: \subsection[Text im Inhaltsverzeichnis]{Titel}
Unterunterabschnitt anfangen: \subsubsection{Titel}
Noch eine Ebene darunter \paragraph{Titel}

Text fetten: \textbf{Text}
Text kursiv: \textit{Text}

Aufzählung (begin ... end sind sogenannte Umgebungen, das document selbst ist auch eine. Für nummerierte Aufzählung hieße die Umgebung "enumerate"):
\begin{itemize}
\item ein Aufzählungspunkt
\end{itemize}

Programmcode einfügen (Syntaxhighlighting kommt bei korrekt konfigurierter Sprache):
\begin{lstlisting} [language=Sprachenname, caption=Beschreibung, label=Kürzel]
Code
\end{lstlisting}

Bild einfügen, z.B. mit Option width=\textwidth und als Position t für Seitenanfang, b für Seitenende, H für die Stelle, wo der Code steht.
\begin{figure}[Positionsparameter]
\includegraphics[Optionen]{Bildpfad}
\caption{Bildunterschrift}
\label{Kürzel}
\end{figure}

Tabelle einfügen: Dafür den Code am besten von einem Online-Generator basteln lassen. Das schont die Nerven :)

Inhalt vom Text umfließen lassen:
Um Bilder und Listings kommt folgender Code (Mit Option o ist es "außen", also auf ungeraden Seiten rechts, auf geraden links. Das andere ist die Breite):
\begin{wrapfigure}{o}{0.5\textwidth}
...
\end{wrapfigure}
Um Tabellen kommt STATT \begin{tabular} ... das wie oben aber mit wraptable statt wrapfigure!
Achtung: Dieses Umfließen endet im Chaos, wenn die Figur nicht mehr auf die Seite passt. Dann also den Befehl dahin verschieben, wo es klappen müsste!

Fußnote: \footnote{Text}

Literaturquelle einfügen: Am bisherigen Inhalt der bibliography.bib orientieren und in der Form einen neuen Eintrag anlegen. Mehrere Autoren mit "and" trennen, damit LaTeX versteht, wo ein neuer Name anfängt.
Zitieren:
\cite{Kürzel der Quelle}

Bild im Text referenzieren (gibt die Abbildungsnummer aus und verlinkt sie auf die Seite, auf der das Bild steht):
\ref{Label des Bildes}