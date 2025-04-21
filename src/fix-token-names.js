async function fixTokenNames() {
    console.log("Rozpoczynam synchronizację nazw tokenów...");
  
    // Iterujemy po wszystkich scenach w grze
    for (const scene of game.scenes.contents) {
      const updates = [];
      console.log(`Sprawdzam scenę: ${scene.name}`);
  
      // Iteracja po wszystkich tokenach w scenie
      for (const token of scene.tokens) {
        const actor = game.actors.get(token.actorId);
  
        if (!actor) {
          console.log(`Brak aktora dla tokena ${token.name} (token ID: ${token.id}) na scenie ${scene.name}`);
          continue;
        }
  
        // Ustawiamy oczekiwaną nazwę tokena na nazwę aktora
        const correctName = actor.name;
  
        // Logowanie nazw i porównanie
        console.log(`Token: ${token.name} | Aktor: ${actor.name} | Oczekiwana nazwa: ${correctName}`);
  
        // Jeśli nazwa tokena różni się od oczekiwanej nazwy, aktualizujemy
        if (token.name !== correctName) {
          console.log(`Aktualizuję token ${token.name} na nazwę: ${correctName}`);
          updates.push({ _id: token.id, name: correctName });
        }
      }
  
      // Jeśli są jakieś tokeny do zaktualizowania, wykonaj aktualizację
      if (updates.length > 0) {
        console.log(`Aktualizuję ${updates.length} tokenów w scenie "${scene.name}"`);
        await scene.updateEmbeddedDocuments("Token", updates);
      } else {
        console.log(`Brak zmian w tokenach na scenie ${scene.name}`);
      }
    }
  
    console.log("Synchronizacja nazw tokenów zakończona.");
  }

  Hooks.on("renderCompendiumDirectory", (app, html) => {
    const button = $(`<button><i class="fas fa-sync-alt"></i> Popraw nazwy tokenów</button>`);
    button.on("click", async () => {
      ui.notifications.info("Aktualizuję nazwy tokenów...");
      await fixTokenNames();
      ui.notifications.info("Nazwy tokenów zaktualizowane.");
    });
    html.find(".directory-footer").append(button);
  });
  