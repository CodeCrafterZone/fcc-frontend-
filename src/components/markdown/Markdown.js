import React from "react";
import { marked } from "marked";
import "./Markdown.css"; // Importer la bibliothèque 'marked' pour convertir le markdown en HTML

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Contenu par défaut de l'éditeur avec du markdown
      editorContent: `# Titre 1
## Titre 2
[Un lien](https://example.com)
\`Code en ligne\`
\`\`\`
// Bloc de code
function hello() {
  return 'Bonjour, Monde!';
}
\`\`\`
- Élément de liste 1
- Élément de liste 2
> Bloc de citation
![Image](https://via.placeholder.com/200)
**Texte en gras**`,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    // Appele et mise à jour fonction lors du chargement initial
    this.updatePreview();
  }

  handleEditorChange(event) {
    // Mise à jour du contenu de l'éditeur lorsqu'il change
    this.setState(
      {
        editorContent: event.target.value,
      },
      () => {
        // Appeler la fonction pour la mise à jour de l'état
        this.updatePreview();
      }
    );
  }

  updatePreview() {
    // Convertir le contenu de l'éditeur en HTML à l'aide de 'marked'
    const { editorContent } = this.state;
    const previewHtml = marked(editorContent, { breaks: true }); // Ajout de l'option pour interpréter les retours à la ligne
    // Mettre à jour le HTML de l'élément d'aperçu
    document.getElementById("preview").innerHTML = previewHtml;
  }

  render() {
    const { editorContent } = this.state;

    return (
      <div>
        {/* Zone de texte pour éditer le markdown */}
        <textarea
          id="editor"
          value={editorContent}
          onChange={this.handleEditorChange}
        ></textarea>
        {/* Zone pour afficher l'aperçu converti en HTML */}
        <div id="preview"></div>

        {/* Commentaire */}
        <p>
          {/* My markdown previewer interprets carriage returns and renders them as br (line break) elements. */}
          {/* Mon interpréteur de markdown interprète les retours à la ligne et les rend comme des éléments br (saut de ligne). */}
        </p>
      </div>
    );
  }
}
export default Markdown;
