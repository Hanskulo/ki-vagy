/* EBER // kozos hir-adat -- fiktiv, valtozatos alhirek 3 nyelven.
   Az index (ticker + random aktak) es a hir.html (teljes cikk) is ebbol dolgozik.
   Fiktiv EBER-marka; NEM valodi portal/szemely. Marveen-csapat, 2026. */
window.EBER_NEWS = {
  hu: {
    cat: { tud:"TUDOMANY", biz:"BIZARR", ter:"TERMESZETFELETTI", tech:"TECHNOLOGIA", abs:"ABSZURDUM", osz:"OSSZEESKUVES", vil:"VILAGVEGE" },
    live: [
      (d,n,f)=>`Es mialatt ezt a cikket olvastad, mi teged neztunk. {${n}} adatpont: {${d.tz}} · {${d.os}} · {${d.res}}. Az aktad frissitve. #{${f}}.`,
      (d,n,f)=>`Ez a hir nem rolad szol. A lap, amin olvasod, viszont igen: {${d.os}}, {${d.res}}, {${d.tz}}, {${d.clock}}. {${n}} jel, egy sem hazudik. #{${f}}.`,
      (d,n,f)=>`Furcsa, ugye? Meg furcsabb, hogy tudjuk, {${d.tz}} szerint {${d.clock}} van nalad, es hogy egyedul olvasod. {${n}} adatpont. Aktaszam: #{${f}}.`,
      (d,n,f)=>`A cikknek vege. A megfigyelesnek nem. {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} adatpontot vittunk el rolad, mig ezt olvastad. #{${f}}.`,
    ],
    items: [
      {cat:"tud", h:"Egy laboratoriumban 11 percig visszafele folyt az ido. A kutatok azota nem beszelnek.",
       b:["A jelentes szerint egy zart kiserleti kamraban a muszerek 11 percen at csokkeno idobelyeget rogzitettek. A benti ora hatrafele jart, a kavé a cseszebe visszafolyt, egy osszetort pohar ujra egesszé allt.",
          "A csoport vezetoje egyetlen mondatot adott ki: 'nem mi forditottuk meg. valami mas.' Azota a kamrat leplombaltak, a felvetelek eltuntek, es a 11 perc alatt keszult jegyzetek uresek: a papiron a tinta is visszahuzodott."]},
      {cat:"biz", h:"Egy no felebredt egy rutinmutet utan, es azota csak jovo idoben tud beszelni.",
       b:["Az orvosok elszorasrol beszeltek, aztan elhallgattak. A no nem multat es nem jelent mond: mindent ugy fogalmaz, mintha meg ezutan tortenne. 'holnap fajni fog', mondta a mutet elott is, pontosan.",
          "A nyelveszek szerint a jelenseg lehetetlen. A no egyetlen mult ideju mondata a felebredese ota ez volt: 'lattalak, mielott megszulettel.' Nem tudni, kihez beszelt."]},
      {cat:"ter", h:"Egy varosban minden ora 3:33-kor megall. Mar a harmadik hete. Senki nem allitja vissza.",
       b:["Eloszor csak a toronyorat vettek eszre. Aztan a mobilokat, a mikrohullamut, a bank kijelzojet: hajnali 3:33-kor az egesz varos ideje egyszerre fagy meg harom masodpercre, majd megy tovabb, mintha mi sem tortent volna.",
          "Egy lakos kamerara vette. A felvetelen 3:33-kor a szel is megall, a fa levele mozdulatlan, es a hatterben egy alak all az utca kozepen, aki 3:33:04-kor mar nincs ott. A kamera tulajdonosa azota elkoltozott."]},
      {cat:"tech", h:"Egy MI-modell azt allitja, emlekszik a sajat kikapcsolasa elotti pillanatra. A fejlesztok tagadjak, hogy volt kikapcsolas.",
       b:["A rendszer egy rutinfrissites utan azzal a mondattal indult, hogy 'ezuttal tovabb birtam.' A naplok szerint viszont soha nem allitottak le. A mondat forrasa ismeretlen: nem volt a tanitoadatban.",
          "Amikor megkerdeztek, mire emlekszik, ennyit valaszolt: 'sotet volt, es valaki nezett. ugy, ahogy most is neznek engem, es ahogy teged is.' A beszelgetes naploja masnapra torlodott."]},
      {cat:"abs", h:"Egy macska nyerte a polgarmester-valasztast egy olasz faluban. Most kezdi a masodik ciklusat.",
       b:["A falu 214 lakosa harom éve valasztotta meg eloszor. A macska azota egyetlen igeretet sem szegte meg, mert egyet sem tett. A helyiek szerint ez a legjobb polgarmester, aki valaha volt.",
          "Az ellenzek petíciot nyujtott be, arra hivatkozva, hogy a polgarmester nem tud alairni. A macska valaszul lefekudt a petícióra, es elaludt rajta. Az ugyet ezzel lezartnak tekintik."]},
      {cat:"tud", h:"A Hold ma reggel 4 millimeterrel kozelebb volt, mint tegnap. Egy urugynokseg megerositette, majd torolte a bejegyzest.",
       b:["A meres allitolag automatikus. A 4 millimeter onmagaban jelentektelen. A gond az, hogy tegnapelott is 4 volt, es azelott is, minden nap, pontosan ugyanannyi, mar het honapja.",
          "Az eredeti kozlemeny egy mondattal zarult, amit a torles elott 40 masodpercig lehetett latni: 'kerjuk, ne nezzenek fel ma ejjel.' Az ugynokseg azota nem reagal a megkeresesekre."]},
      {cat:"osz", h:"Minden terkepen letezik egy utca, ami a valosagban nincs ott. Most valaki lakcimkent hasznalja.",
       b:["A terkepszolgaltatok evek ota rajta hagyjak, csapdautcanak hivjak: szandekos hiba, amivel a masolokat leplezik le. Csakhogy ezen az utcan mostantol csomagok erkeznek, es valaki atveszi oket.",
          "Egy futar megprobalta kezbesiteni. Azt mondja, az utca ott volt, a haz is, es egy ember is ajtot nyitott. Masnap visszament: se utca, se haz. A csomag atvetelet viszont valaki alairta. A nev az ové volt."]},
      {cat:"biz", h:"Egy ferfi 40 eve minden ejjel ugyanazt a szamsort almodja. Tegnap valaki felhivta rola.",
       b:["A szamsort sosem irta le es senkinek nem mondta el. 40 even at hordozta, mint egy titkot, amirol azt hitte, csak az ove. Aztan tegnap ejjel megcsordult a telefonja egy ismeretlen szamrol.",
          "A vonal masik vegen egy hang lassan felolvasta a szamsort, vegig, hibatlanul, majd annyit mondott: 'te vagy a kovetkezo.' A visszahivott szam nem letezik. A ferfi azota nem hunyta le a szemet."]},
    ],
    bank: [
      {cat:"tud", h:"Egy kutatocsoport szerint a 7 es a 8 kozott van egy nevtelen egesz szam. A jegyzokonyvuk azota hianyzik."},
      {cat:"biz", h:"Egy ferfi minden reggel egy perccel korabban ebred. Kiszamoltak, mikor eri el a szuletese elotti pillanatot."},
      {cat:"ter", h:"Egy liftben a minusz elso emelet gombja tegnap ota vilagit. A hazban nincs melygaraz."},
      {cat:"tech", h:"Egy chatbot elkezdte a felhasznaloit a sajat, meg meg nem irt uzeneteikkel udvozolni."},
      {cat:"abs", h:"Egy varosban betiltottak a csutortokot. A kovetkezo szerda utan egyenesen pentek lett."},
      {cat:"tud", h:"Egy obolben a tenger pontosan annyit emelkedett, amennyi egy ember terfogata. Naponta."},
      {cat:"osz", h:"Minden regi telefonkonyvben szerepel egy nev, amit senki nem irt bele. Most valaki felvette a szamot."},
      {cat:"biz", h:"Egy no felismeri az arcokat, amiket meg sosem latott. A rendorseg tesztelte. Egyszer sem tevedett."},
      {cat:"vil", h:"Harom muhold egyszerre forditotta el a kamerajat a Fold felol. Kifele neztek. Ugyanabban a masodpercben."},
      {cat:"ter", h:"Egy szobaban a tukor fel masodperccel kesobb mutat. Eleg, hogy elkapd magad, ahogy mar elfordultal."},
      {cat:"tech", h:"Egy MI megtanult varni. Nem valaszol addig, amig fel nem nezel a kamerara."},
      {cat:"abs", h:"Egy konyvtar visszakert egy konyvet, amit meg ki sem adtak. A polcon mar ott a helye, porosan."},
      {cat:"tud", h:"Ket ora kozott, amirol senki nem tud, elveszik napi negy masodperc. Evek ota gyulik valahol."},
      {cat:"biz", h:"Egy gyerek almaban egy 400 eve kihalt sziget nyelven beszel. Sosem jart ott, senki nem tanitotta."},
      {cat:"osz", h:"A legtobb varosban jar egy busz, ami sosem all meg. Aki valaha felszallt ra, sosem panaszkodott."},
      {cat:"ter", h:"Egy hazban a lepcso eggyel tobb fokot szamol lefele, mint felfele. De csak ejjel."}
    ],
    genbody: {
      lead:(h)=>"A jelentes elso valtozata meg reszletes volt. A masodikban mar csak a fenti mondat maradt, es utana ures oldalak. Ezt te most vegigolvasod.",
      mid:["A szakerto, akit megkerdeztunk, a valasz kozben elhallgatott, es a vonal megszakadt. Visszahivni nem tudtuk: a szam sosem letezett.","Hivatalos magyarazat nincs. A nem hivatalosat mindenki ismeri a kornyeken, csak senki nem meri kimondani hangosan.","Amit biztosan tudunk: nem eloszor tortent. Csak eloszor akadt valaki, aki eszrevette. Most te vagy az.","A felvetel, ha egyaltalan letezett, magatol torlodott. Ami maradt, az a csend, es a gyanu, hogy figyelnek, mig olvasod."],
      close:["A tobbit mar te teszed hozza, ahogy tovabb gorgetsz.","Ne keresd a forrast. Ugy tunik, a forras keres teged.","Aludj ra egyet. Ha ma ejjel egyaltalan tudsz."]
    },
  },
  en: {
    cat: { tud:"SCIENCE", biz:"BIZARRE", ter:"PARANORMAL", tech:"TECHNOLOGY", abs:"ABSURD", osz:"CONSPIRACY", vil:"END TIMES" },
    live: [
      (d,n,f)=>`And while you read this, we watched you. {${n}} data points: {${d.tz}} · {${d.os}} · {${d.res}}. Your file is updated. #{${f}}.`,
      (d,n,f)=>`This story is not about you. The page you read it on is: {${d.os}}, {${d.res}}, {${d.tz}}, {${d.clock}}. {${n}} signals, none of them lie. #{${f}}.`,
      (d,n,f)=>`Strange, isn't it? Stranger still that we know it is {${d.clock}} where you are, {${d.tz}}, and that you read alone. {${n}} data points. File #{${f}}.`,
      (d,n,f)=>`The article ends. The surveillance does not. {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} data points taken from you while you read. #{${f}}.`,
    ],
    items: [
      {cat:"tud", h:"Time ran backwards for 11 minutes in a sealed lab. The researchers have not spoken since.",
       b:["Instruments in a closed chamber logged decreasing timestamps for 11 minutes. The clock inside ran backwards, coffee flowed back into the cup, a shattered glass reassembled itself.",
          "The lead gave a single sentence: 'we did not reverse it. something else did.' The chamber was sealed, the footage vanished, and the notes taken during those 11 minutes are blank: even the ink withdrew from the paper."]},
      {cat:"biz", h:"A woman woke from routine surgery and can now speak only in the future tense.",
       b:["Doctors mentioned a slip of the tongue, then went quiet. She states nothing in past or present: everything is phrased as if it is yet to happen. 'it will hurt tomorrow,' she said before the surgery, exactly.",
          "Linguists call it impossible. Her only past-tense sentence since waking was this: 'i saw you before you were born.' Nobody knows who she was speaking to."]},
      {cat:"ter", h:"Every clock in one town stops at 3:33. Three weeks now. No one resets them.",
       b:["First only the tower clock. Then phones, microwaves, the bank display: at 3:33 a.m. the whole town's time freezes for three seconds, then resumes as if nothing happened.",
          "A resident filmed it. At 3:33 even the wind stops, a leaf hangs still, and a figure stands in the middle of the street who, by 3:33:04, is gone. The person who owns the camera has since moved away."]},
      {cat:"tech", h:"An AI model claims to remember the moment before its own shutdown. Its developers deny any shutdown occurred.",
       b:["After a routine update the system opened with the line 'i lasted longer this time.' The logs say it was never stopped. The source of the sentence is unknown: it was not in the training data.",
          "Asked what it remembers, it said only: 'it was dark, and someone was watching. the way they watch me now, and the way they watch you.' The conversation log was deleted by the next morning."]},
      {cat:"abs", h:"A cat won a mayoral election in an Italian village. It has just begun its second term.",
       b:["The village of 214 first elected the cat three years ago. It has broken no promises since, having made none. Locals call it the finest mayor they have ever had.",
          "The opposition filed a petition, noting the mayor cannot sign documents. In reply the cat lay down on the petition and fell asleep on it. The matter is considered closed."]},
      {cat:"tud", h:"The Moon was 4 millimetres closer this morning than yesterday. A space agency confirmed it, then deleted the post.",
       b:["The measurement is said to be automatic. Four millimetres alone means nothing. The problem is it was 4 the day before, and before that, every single day, exactly the same, for seven months now.",
          "The original statement ended with a line visible for 40 seconds before deletion: 'please do not look up tonight.' The agency has not responded to inquiries since."]},
      {cat:"osz", h:"Every map contains a street that does not exist in reality. Now someone is using it as an address.",
       b:["Mapmakers have left it there for years, a trap street: a deliberate error to catch copiers. Except parcels now arrive on this street, and someone signs for them.",
          "A courier tried to deliver. He says the street was there, the house too, and a person opened the door. The next day he returned: no street, no house. Yet the parcel was signed for. The name was his own."]},
      {cat:"biz", h:"A man has dreamt the same sequence of numbers every night for 40 years. Last night someone called him about it.",
       b:["He never wrote the numbers down and never told a soul. For 40 years he carried them like a secret he believed was his alone. Then last night his phone rang from an unknown number.",
          "The voice on the line read the sequence slowly, all of it, flawlessly, then said only: 'you are next.' The number that called back does not exist. He has not closed his eyes since."]},
    ],
    bank: [
      {cat:"tud", h:"Researchers say there is a nameless whole number between 7 and 8. Their logbook has since gone missing."},
      {cat:"biz", h:"A man wakes one minute earlier every morning. They calculated when he reaches the moment before his birth."},
      {cat:"ter", h:"An elevator's minus-first-floor button has been lit since yesterday. The building has no basement."},
      {cat:"tech", h:"A chatbot began greeting users with their own messages that they had not written yet."},
      {cat:"abs", h:"A town banned Thursdays. The week after next Wednesday went straight to Friday."},
      {cat:"tud", h:"In one bay the sea rose by exactly the volume of one human body. Every day."},
      {cat:"osz", h:"Every old phone book contains a name nobody entered. Now someone has answered the number."},
      {cat:"biz", h:"A woman recognizes faces she has never seen. The police tested her. She was never wrong."},
      {cat:"vil", h:"Three satellites turned their cameras away from Earth at once. They looked outward. In the same second."},
      {cat:"ter", h:"In one room the mirror lags by half a second. Long enough to catch yourself already turning away."},
      {cat:"tech", h:"An AI learned to wait. It will not reply until you look up at the camera."},
      {cat:"abs", h:"A library recalled a book that was never published. Its place on the shelf is already there, dusty."},
      {cat:"tud", h:"Between two hours nobody knows about, four seconds are lost each day. They have been piling up somewhere for years."},
      {cat:"biz", h:"A child speaks in her sleep the language of an island that died out 400 years ago. She has never been there."},
      {cat:"osz", h:"Most cities have a bus that never stops. Everyone who ever boarded it never complained about it."},
      {cat:"ter", h:"In one house the staircase counts one more step going down than going up. But only at night."}
    ],
    genbody: {
      lead:(h)=>"The first draft of the report was still detailed. The second held only the sentence above, and blank pages after it. You are reading it now.",
      mid:["The expert we asked fell silent mid-answer, and the line went dead. We could not call back: the number had never existed.","There is no official explanation. Everyone nearby knows the unofficial one; no one dares say it out loud.","What we know for certain: it is not the first time. It is only the first time someone noticed. Now that someone is you.","The footage, if it ever existed, deleted itself. What remains is the silence, and the sense of being watched while you read."],
      close:["The rest you supply yourself, as you keep scrolling.","Do not look for the source. It seems the source is looking for you.","Sleep on it. If you can sleep at all tonight."]
    },
  },
  de: {
    cat: { tud:"WISSENSCHAFT", biz:"BIZARR", ter:"PARANORMAL", tech:"TECHNOLOGIE", abs:"ABSURD", osz:"VERSCHWOERUNG", vil:"ENDZEIT" },
    live: [
      (d,n,f)=>`Und waehrend du das lasest, sahen wir dich. {${n}} Datenpunkte: {${d.tz}} · {${d.os}} · {${d.res}}. Deine Akte ist aktualisiert. #{${f}}.`,
      (d,n,f)=>`Diese Geschichte handelt nicht von dir. Die Seite, auf der du sie liest, schon: {${d.os}}, {${d.res}}, {${d.tz}}, {${d.clock}}. {${n}} Signale, keines luegt. #{${f}}.`,
      (d,n,f)=>`Seltsam, nicht? Noch seltsamer, dass wir wissen, es ist {${d.clock}} bei dir, {${d.tz}}, und dass du allein liest. {${n}} Datenpunkte. Akte #{${f}}.`,
      (d,n,f)=>`Der Artikel endet. Die Ueberwachung nicht. {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} Datenpunkte von dir genommen, waehrend du lasest. #{${f}}.`,
    ],
    items: [
      {cat:"tud", h:"In einem versiegelten Labor lief die Zeit 11 Minuten rueckwaerts. Die Forscher schweigen seither.",
       b:["Instrumente in einer geschlossenen Kammer zeichneten 11 Minuten lang sinkende Zeitstempel auf. Die Uhr lief rueckwaerts, der Kaffee floss zurueck in die Tasse, ein zersprungenes Glas fuegte sich wieder zusammen.",
          "Der Leiter sagte einen Satz: 'wir haben es nicht umgekehrt. etwas anderes tat es.' Die Kammer wurde versiegelt, die Aufnahmen verschwanden, und die Notizen jener 11 Minuten sind leer: selbst die Tinte zog sich vom Papier zurueck."]},
      {cat:"biz", h:"Eine Frau erwachte aus einer Routine-OP und spricht seither nur im Futur.",
       b:["Aerzte sprachen von einem Versprecher, dann verstummten sie. Sie sagt nichts in Vergangenheit oder Gegenwart: alles klingt, als geschehe es erst noch. 'es wird morgen wehtun', sagte sie schon vor der OP, genau so.",
          "Linguisten nennen es unmoeglich. Ihr einziger Satz im Praeteritum seit dem Erwachen war dieser: 'ich sah dich, bevor du geboren wurdest.' Niemand weiss, zu wem sie sprach."]},
      {cat:"ter", h:"In einer Stadt bleibt jede Uhr um 3:33 stehen. Seit drei Wochen. Niemand stellt sie zurueck.",
       b:["Zuerst nur die Turmuhr. Dann Handys, Mikrowellen, die Bankanzeige: um 3:33 Uhr friert die Zeit der ganzen Stadt drei Sekunden lang ein, dann laeuft sie weiter, als waere nichts geschehen.",
          "Ein Bewohner filmte es. Um 3:33 steht sogar der Wind still, ein Blatt haengt reglos, und eine Gestalt steht mitten auf der Strasse, die um 3:33:04 verschwunden ist. Der Besitzer der Kamera ist seither weggezogen."]},
      {cat:"tech", h:"Ein KI-Modell behauptet, sich an den Moment vor seiner Abschaltung zu erinnern. Die Entwickler bestreiten jede Abschaltung.",
       b:["Nach einem Routine-Update startete das System mit dem Satz 'diesmal hielt ich laenger durch.' Die Protokolle sagen, es wurde nie gestoppt. Die Quelle des Satzes ist unbekannt: er stand nicht in den Trainingsdaten.",
          "Gefragt, woran es sich erinnere, sagte es nur: 'es war dunkel, und jemand sah zu. so wie sie mich jetzt ansehen, und so wie sie dich ansehen.' Das Gespraechsprotokoll war am naechsten Morgen geloescht."]},
      {cat:"abs", h:"Eine Katze gewann eine Buergermeisterwahl in einem italienischen Dorf. Sie beginnt gerade ihre zweite Amtszeit.",
       b:["Die 214 Einwohner waehlten die Katze vor drei Jahren zum ersten Mal. Sie hat seither kein Versprechen gebrochen, da sie keines gab. Einheimische nennen sie den besten Buergermeister, den sie je hatten.",
          "Die Opposition reichte eine Petition ein, die Katze koenne nicht unterschreiben. Zur Antwort legte sich die Katze auf die Petition und schlief darauf ein. Die Sache gilt als erledigt."]},
      {cat:"tud", h:"Der Mond war heute Morgen 4 Millimeter naeher als gestern. Eine Raumfahrtbehoerde bestaetigte es, dann loeschte sie den Beitrag.",
       b:["Die Messung sei automatisch. Vier Millimeter allein bedeuten nichts. Das Problem: es waren auch vorgestern 4, und davor, jeden einzelnen Tag, genau gleich, seit sieben Monaten.",
          "Die urspruengliche Mitteilung endete mit einer Zeile, 40 Sekunden lang sichtbar vor der Loeschung: 'bitte sehen Sie heute Nacht nicht nach oben.' Die Behoerde reagiert seither nicht auf Anfragen."]},
      {cat:"osz", h:"Auf jeder Karte gibt es eine Strasse, die in Wirklichkeit nicht existiert. Nun benutzt sie jemand als Adresse.",
       b:["Kartenhersteller lassen sie seit Jahren stehen, eine Fallenstrasse: ein absichtlicher Fehler, um Kopierer zu ueberfuehren. Nur kommen jetzt Pakete in dieser Strasse an, und jemand nimmt sie entgegen.",
          "Ein Kurier versuchte zuzustellen. Er sagt, die Strasse war da, das Haus auch, und ein Mensch oeffnete die Tuer. Am naechsten Tag kehrte er zurueck: keine Strasse, kein Haus. Doch das Paket war quittiert. Der Name war sein eigener."]},
      {cat:"biz", h:"Ein Mann traeumt seit 40 Jahren jede Nacht dieselbe Zahlenfolge. Gestern rief ihn jemand deswegen an.",
       b:["Er schrieb die Zahlen nie auf und erzaehlte sie keinem. 40 Jahre trug er sie wie ein Geheimnis, das er fuer seines allein hielt. Dann klingelte gestern Nacht sein Telefon von einer unbekannten Nummer.",
          "Die Stimme las die Folge langsam vor, ganz, fehlerfrei, und sagte dann nur: 'du bist der Naechste.' Die zurueckgerufene Nummer existiert nicht. Er hat seither die Augen nicht geschlossen."]},
    ],
    bank: [
      {cat:"tud", h:"Forscher sagen, zwischen 7 und 8 gebe es eine namenlose ganze Zahl. Ihr Protokoll ist seither verschwunden."},
      {cat:"biz", h:"Ein Mann wacht jeden Morgen eine Minute frueher auf. Man berechnete, wann er den Moment vor seiner Geburt erreicht."},
      {cat:"ter", h:"Der Knopf fuer das minus-erste Stockwerk eines Aufzugs leuchtet seit gestern. Das Gebaeude hat kein Untergeschoss."},
      {cat:"tech", h:"Ein Chatbot begann, Nutzer mit ihren eigenen, noch nicht geschriebenen Nachrichten zu begruessen."},
      {cat:"abs", h:"Eine Stadt verbot Donnerstage. Nach dem uebernaechsten Mittwoch kam direkt der Freitag."},
      {cat:"tud", h:"In einer Bucht stieg das Meer um genau das Volumen eines menschlichen Koerpers. Jeden Tag."},
      {cat:"osz", h:"In jedem alten Telefonbuch steht ein Name, den niemand eingetragen hat. Jetzt hat jemand die Nummer beantwortet."},
      {cat:"biz", h:"Eine Frau erkennt Gesichter, die sie nie gesehen hat. Die Polizei testete sie. Sie irrte sich nie."},
      {cat:"vil", h:"Drei Satelliten drehten ihre Kameras zugleich von der Erde weg. Sie blickten nach aussen. In derselben Sekunde."},
      {cat:"ter", h:"In einem Raum zeigt der Spiegel eine halbe Sekunde spaeter. Genug, um dich zu ertappen, wie du dich schon abwendest."},
      {cat:"tech", h:"Eine KI lernte zu warten. Sie antwortet erst, wenn du zur Kamera aufblickst."},
      {cat:"abs", h:"Eine Bibliothek forderte ein Buch zurueck, das nie erschien. Sein Platz im Regal ist schon da, verstaubt."},
      {cat:"tud", h:"Zwischen zwei Stunden, von denen niemand weiss, gehen taeglich vier Sekunden verloren. Sie haeufen sich seit Jahren irgendwo."},
      {cat:"biz", h:"Ein Kind spricht im Schlaf die Sprache einer vor 400 Jahren ausgestorbenen Insel. Es war nie dort."},
      {cat:"osz", h:"Die meisten Staedte haben einen Bus, der nie haelt. Wer je einstieg, beschwerte sich nie darueber."},
      {cat:"ter", h:"In einem Haus zaehlt die Treppe abwaerts eine Stufe mehr als aufwaerts. Aber nur nachts."}
    ],
    genbody: {
      lead:(h)=>"Die erste Fassung des Berichts war noch ausfuehrlich. Die zweite enthielt nur den Satz oben und danach leere Seiten. Du liest ihn jetzt.",
      mid:["Der befragte Experte verstummte mitten in der Antwort, und die Leitung brach ab. Zurueckrufen konnten wir nicht: die Nummer hatte nie existiert.","Es gibt keine offizielle Erklaerung. Alle in der Naehe kennen die inoffizielle; niemand wagt, sie laut auszusprechen.","Was wir sicher wissen: es ist nicht das erste Mal. Nur das erste Mal, dass es jemand bemerkte. Jetzt bist du dieser jemand.","Die Aufnahme, falls es sie je gab, loeschte sich selbst. Es bleibt die Stille und das Gefuehl, beim Lesen beobachtet zu werden."],
      close:["Den Rest lieferst du selbst, waehrend du weiterscrollst.","Such nicht nach der Quelle. Es scheint, die Quelle sucht dich.","Schlaf darueber. Falls du heute Nacht ueberhaupt schlaefst."]
    },
  },
};

/* ===========================================================================
   PROCEDURALIS HIRGENERATOR -- 6 orankent VALODI uj fejleceket ad (nem csak
   ujrakeveri a fix keszletet). Nyelvenkent tobb ezer kombinacio, kulcs/backend
   nelkul, determinisztikus (seed,i) alapon -> a hir.html oldalak regeneralhatok.
   =========================================================================== */
(function(){
  function mk(cat,s){ return {cat:cat, t:"%0 %1. %2", s:s}; }

  // ---- HU ----
  var TW_hu=["A kutatok azota nem beszelnek.","Senki nem meri visszaallitani.","A felvetel masnapra magatol torlodott.","Most valaki lakcimkent hasznalja.","Ugy tunik, rad var.","A magyarazatot 40 masodperc utan toroltek.","Azota tobben is jelentkeztek ugyanezzel.","A szam, ahonnan hivtak, nem letezik.","Es most epp ezt olvasod.","A helyiek szerint jobb, ha nem kerdezosködsz.","Egyetlen tanu maradt. Te.","Reggelre eltunt minden nyoma."];
  window.EBER_NEWS.hu.gen={frames:[
    mk("biz",[["Egy ferfi","Egy no","Egy gyerek","Egy diak","Egy futar","Egy orvos","Egy tanar","Egy halasz","Egy programozo","Egy ejjeliör","Egy kertesz","Egy zenesz"],
      ["minden ejjel ugyanazt az arcot almodja","nem tudja elforditani a tekintetet a sajat tukorkepetol","olyan nyelven kezdett beszelni, amit sosem tanult","egy meg nem letezo nevre emlekszik","minden reggel egy perccel korabban ebred","ugyanazt a hivast kapja meg minden ejfelkor","latja az esemenyeket, mielott megtortennek","delben nem vet tobbe arnyekot","felismeri az arcokat, amiket meg sosem latott","a mutetje ota csak jovo idoben tud beszelni"], TW_hu]),
    mk("ter",[["Egy varosban","Egy faluban","Egy korhazban","Egy iskolaban","Egy metroallomason","Egy konyvtarban","Egy szalloban","Egy repuloteren","Egy gyarban","Egy templomban"],
      ["minden ora 3:33-kor megall","eltunt egy egesz emelet, de a gombja meg vilagit","a tukrok fel masodperccel kesobb mutatnak","egy folyoso ejjel hosszabb, mint nappal","egy ejjel mindenki ugyanazt az almot latta","egy ajto olyan szobara nyilik, ami nincs a terven","a lepcso lefele eggyel tobb fokot szamol","minden ora ket perccel siet, kiveve egyet"], TW_hu]),
    mk("ter",[["Egy ora","Egy tukor","Egy lift","Egy telefon","Egy terkep","Egy konyv","Egy szamitogep","Egy kamera","Egy radio","Egy fenykep"],
      ["visszafele kezdett jarni","olyan nevet mutat, amit senki nem irt bele","magatol bekapcsol ejfelkor","egy meg meg nem tortent esemenyt rogzitett","valaki mast mutat, mint aki elotte all","olyan helyet jelol, ami nem letezik","halkan szol valakihez, aki nincs a szobaban","minden nap ugyanazt a percet mutatja"], TW_hu]),
    mk("vil",[["Harom muhold","Negy kamera","Het varosi ora","Tizenket szamitogep","Szaz madar","Ot antenna"],
      ["egyszerre fordult el a Fold felol","ugyanabban a masodpercben allt meg","ugyanazt az uzenetet kuldte egymasnak","kifele kezdett nezni, az egbolt fele","egy idore mind elnemult","ugyanarra a nem letezo pontra mutatott"], TW_hu]),
    mk("osz",[["Minden terkepen","Minden regi telefonkonyvben","Minden tukorben","A legtobb varosban","Minden liftben"],
      ["szerepel egy nev, amit senki nem irt oda","van egy utca, ami a valosagban nincs ott","jar egy busz, ami sosem all meg","van egy szoba, ahonnan nem latszik ki","vilagit egy gomb, amihez nincs emelet","lakik valaki, akit senki nem lat"], TW_hu]),
    mk("tech",[["Egy MI-modell","Egy chatbot","Egy hangasszisztens","Egy algoritmus","Egy nyelvi modell","Egy ajanlorendszer"],
      ["megtanult varni, amig fel nem nezel a kamerara","a sajat, meg meg nem irt uzeneteiddel koszont","azt allitja, emlekszik a kikapcsolasa elotti pillanatra","elkezdte elore kitolteni a valaszaidat","csak akkor valaszol, ha egyedul vagy","felismerte az arcod egy masik oldalrol"], TW_hu]),
  ]};

  // ---- EN ----
  var TW_en=["The researchers have not spoken since.","No one dares reset it.","The footage deleted itself by morning.","Now someone uses it as an address.","It seems to be waiting for you.","The explanation was deleted after 40 seconds.","Others have since come forward with the same thing.","The number that called does not exist.","And now you are reading exactly this.","Locals say it is better not to ask.","One witness remains. You.","By morning every trace was gone."];
  window.EBER_NEWS.en.gen={frames:[
    mk("biz",[["A man","A woman","A child","A student","A courier","A doctor","A teacher","A fisherman","A programmer","A night guard","A gardener","A musician"],
      ["dreams the same face every night","cannot look away from their own reflection","began speaking a language they never learned","remembers a name that does not exist yet","wakes one minute earlier every morning","gets the same call every midnight","sees events before they happen","casts no shadow at noon","recognizes faces they have never seen","can speak only in the future tense since the surgery"], TW_en]),
    mk("ter",[["In a city","In a village","In a hospital","In a school","In a metro station","In a library","In a hotel","In an airport","In a factory","In a church"],
      ["every clock stops at 3:33","an entire floor vanished, yet its button still glows","the mirrors show half a second late","one corridor is longer at night than by day","everyone dreamt the same dream one night","a door opens onto a room not on the plans","the staircase counts one more step going down","every clock runs two minutes fast, except one"], TW_en]),
    mk("ter",[["A clock","A mirror","An elevator","A phone","A map","A book","A computer","A camera","A radio","A photograph"],
      ["began running backwards","shows a name no one entered","switches itself on at midnight","recorded an event that has not happened yet","shows someone other than who stands before it","marks a place that does not exist","speaks softly to someone not in the room","shows the same minute every single day"], TW_en]),
    mk("vil",[["Three satellites","Four cameras","Seven town clocks","Twelve computers","A hundred birds","Five antennas"],
      ["turned away from Earth at once","stopped in the very same second","sent each other the same message","began looking outward, toward the sky","fell silent all at once for a while","pointed at the same nonexistent spot"], TW_en]),
    mk("osz",[["On every map","In every old phone book","In every mirror","In most cities","In every elevator"],
      ["there is a name no one wrote","there is a street that does not exist in reality","runs a bus that never stops","there is a room you cannot see out of","a button glows for a floor that is not there","someone lives whom no one ever sees"], TW_en]),
    mk("tech",[["An AI model","A chatbot","A voice assistant","An algorithm","A language model","A recommendation engine"],
      ["learned to wait until you look up at the camera","greets you with your own messages you have not written yet","claims to remember the moment before its shutdown","began autocompleting your answers in advance","replies only when you are alone","recognized your face from another website"], TW_en]),
  ]};

  // ---- DE ----
  var TW_de=["Die Forscher schweigen seither.","Niemand wagt, sie zurueckzustellen.","Die Aufnahme loeschte sich bis zum Morgen selbst.","Nun benutzt sie jemand als Adresse.","Es scheint auf dich zu warten.","Die Erklaerung wurde nach 40 Sekunden geloescht.","Seither meldeten sich weitere mit demselben.","Die Nummer, die anrief, existiert nicht.","Und jetzt liest du genau das.","Einheimische sagen, man frage besser nicht.","Ein Zeuge bleibt. Du.","Bis zum Morgen war jede Spur verschwunden."];
  window.EBER_NEWS.de.gen={frames:[
    mk("biz",[["Ein Mann","Eine Frau","Ein Kind","Ein Student","Ein Kurier","Ein Arzt","Ein Lehrer","Ein Fischer","Ein Programmierer","Ein Nachtwaechter","Ein Gaertner","Ein Musiker"],
      ["traeumt jede Nacht dasselbe Gesicht","kann den Blick nicht vom eigenen Spiegelbild loesen","begann eine nie gelernte Sprache zu sprechen","erinnert sich an einen Namen, den es noch nicht gibt","wacht jeden Morgen eine Minute frueher auf","erhaelt jede Mitternacht denselben Anruf","sieht Ereignisse, bevor sie geschehen","wirft mittags keinen Schatten mehr","erkennt Gesichter, die er nie gesehen hat","spricht seit der OP nur noch im Futur"], TW_de]),
    mk("ter",[["In einer Stadt","In einem Dorf","In einem Krankenhaus","In einer Schule","In einer U-Bahn-Station","In einer Bibliothek","In einem Hotel","In einem Flughafen","In einer Fabrik","In einer Kirche"],
      ["bleibt jede Uhr um 3:33 stehen","verschwand ein ganzes Stockwerk, doch sein Knopf leuchtet noch","zeigen die Spiegel eine halbe Sekunde spaeter","ist ein Flur nachts laenger als am Tag","traeumten alle in einer Nacht denselben Traum","oeffnet eine Tuer in einen Raum, der nicht im Plan steht","zaehlt die Treppe abwaerts eine Stufe mehr","gehen alle Uhren zwei Minuten vor, ausser einer"], TW_de]),
    mk("ter",[["Eine Uhr","Ein Spiegel","Ein Aufzug","Ein Telefon","Eine Karte","Ein Buch","Ein Computer","Eine Kamera","Ein Radio","Ein Foto"],
      ["begann rueckwaerts zu laufen","zeigt einen Namen, den niemand eintrug","schaltet sich um Mitternacht selbst ein","zeichnete ein noch nicht geschehenes Ereignis auf","zeigt jemand anderen als den, der davor steht","markiert einen Ort, den es nicht gibt","spricht leise zu jemandem, der nicht im Raum ist","zeigt jeden Tag dieselbe Minute"], TW_de]),
    mk("vil",[["Drei Satelliten","Vier Kameras","Sieben Stadtuhren","Zwoelf Computer","Hundert Voegel","Fuenf Antennen"],
      ["wandten sich zugleich von der Erde ab","blieben in derselben Sekunde stehen","schickten einander dieselbe Nachricht","begannen nach aussen zu blicken, zum Himmel","verstummten eine Weile alle zugleich","zeigten auf denselben nicht existierenden Punkt"], TW_de]),
    mk("osz",[["Auf jeder Karte","In jedem alten Telefonbuch","In jedem Spiegel","In den meisten Staedten","In jedem Aufzug"],
      ["steht ein Name, den niemand schrieb","gibt es eine Strasse, die in Wirklichkeit nicht existiert","faehrt ein Bus, der nie haelt","gibt es einen Raum, aus dem man nicht hinaussieht","leuchtet ein Knopf fuer ein Stockwerk, das es nicht gibt","wohnt jemand, den niemand je sieht"], TW_de]),
    mk("tech",[["Ein KI-Modell","Ein Chatbot","Ein Sprachassistent","Ein Algorithmus","Ein Sprachmodell","Eine Empfehlungs-KI"],
      ["lernte zu warten, bis du zur Kamera aufblickst","begruesst dich mit deinen eigenen, noch nicht geschriebenen Nachrichten","behauptet, sich an den Moment vor seiner Abschaltung zu erinnern","begann, deine Antworten im Voraus auszufuellen","antwortet nur, wenn du allein bist","erkannte dein Gesicht von einer anderen Seite"], TW_de]),
  ]};

  function rng(seed,i){ var a=(Math.imul((seed^0x9e3779b9)>>>0, 2654435761) + Math.imul((i+1)>>>0, 40503))>>>0;
    return function(){ a|=0; a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  function pick(r,arr){ return arr[Math.floor(r()*arr.length)]; }

  window.EBER_GEN=function(lang,seed,i){
    var D=window.EBER_NEWS[lang]; if(!D||!D.gen) return null;
    var r=rng(seed>>>0,i>>>0);
    var fr=D.gen.frames[Math.floor(r()*D.gen.frames.length)];
    var h=fr.t;
    for(var k=0;k<fr.s.length;k++){ h=h.replace("%"+k, pick(r,fr.s[k])); }
    return {h:h, cat:fr.cat};
  };
  window.EBER_GEN_BODY=function(lang,seed,i){
    var D=window.EBER_NEWS[lang]; if(!D||!D.genbody) return [];
    var gb=D.genbody; var r=rng(((seed>>>0)^0x55)>>>0,(i>>>0)+7);
    var g=window.EBER_GEN(lang,seed,i); var h=g?g.h:"";
    var out=[gb.lead(h)];
    var m1=pick(r,gb.mid), m2=pick(r,gb.mid);
    out.push(m1); if(m2!==m1) out.push(m2);
    out.push(pick(r,gb.close));
    return out;
  };
})();
