// store/ArticleProvider.js
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes

/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `ArticleContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */
export const ArticleContext = createContext({
    articles: [],
    addArticle: () => {},
    deleteArticle: () => {}
});

/**
 * la classe ArticleProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class ArticleProvider extends Component {

    constructor(props) {
        super(props);

        // Bind manually all needed method
        // This need to be done BEFORE this.state init
        this.addArticle = this.addArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);

        this.state = {
            articles:
                [
                    {
                        id: 1,
                        text: "Premier Context",
                        approved: true,
                        rejected: false
                    }
                ],
            nb_articles: 1,
            display_error: false,
            addArticle: this.addArticle,
            deleteArticle: this.deleteArticle
        }
    }

    addArticle(text){
        console.info("Contenu de l'article à ajouter: " + text);

        if(this.state.nb_articles > 4){
            this.setState({display_error: true})
        }else{
            this.setState((prevState) => {
                return {
                    articles: [
                        ...prevState.articles,
                        {
                            id: prevState.articles.reduce((maxId, article) => Math.max(article.id, maxId), -1) + 1,
                            text: text,
                            approved: text.length < 10,
                            rejected: !(text.length < 10)
                        },
                    ],
                    nb_articles: prevState.nb_articles + 1,
                }
            })   
        }
    }

    deleteArticle(article_id){
        this.setState((prevState) => {
			return {
                articles: prevState.articles.filter((article) => article.id !== article_id),
                nb_articles: prevState.nb_articles - 1
			}
        })
        var true_this = this;
        setTimeout(function () {
            if(true_this.state.nb_articles < 5){
                true_this.setState({display_error: false})
            }
        }, 200);
        
    }

    render() {
        return (
            /**
             * la propriété value est très importante ici, elle rend
             * le contenu du state disponible aux `Consumers` de l'application
             */
            <ArticleContext.Provider value={this.state} >
                {this.props.children}
            </ArticleContext.Provider>
        );
    }
}

export default ArticleProvider;