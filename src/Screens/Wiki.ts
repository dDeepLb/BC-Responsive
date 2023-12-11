import { GuiSubscreen } from "../Base/BaseSetting";
import wikiStyle from "../Static/wiki.css";
import wikiPage from "../Static/wiki.html";
import { injectStyle } from "../Utilities/Other";

export class GuiWiki extends GuiSubscreen {
  get name(): string {
    return "wiki";
  }

  Load(): void {
    // Inject style for wiki
    injectStyle(wikiStyle, "wiki");

    // Create a wrapper element in the current document
    const wrapper = document.createElement("div");

    // Set the HTML content received from the template file as innerHTML of the wrapper
    wrapper.innerHTML = wikiPage;

    // Find the specific div element in the wrapper
    const wiki = wrapper.querySelector("#wiki-main-page");

    // Append the wiki content to the current document
    document.body.appendChild(wiki);
  }

  Exit(): void {
    document.getElementById("wiki-main-page").remove();
    this.setSubscreen("mainmenu");
  }
}
