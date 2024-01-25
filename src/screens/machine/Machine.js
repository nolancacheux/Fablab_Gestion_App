import React, { useState, useEffect } from "react";
import Header from "./../../components/header/Header";
import Navigation from "./../../components/navigation/Navigation";
import "./machine.css"
import config from "../../configip.js"
import Product_Card_Outils from "./Component JS Stock/Product_Card_Outils.js";
import Add_Compo_Outils from "./Component JS Stock/Add_Compo_Outils.js";

import Product_Card_Machine from "./Component JS Stock/Product_Card_Machine.js";
import Add_Compo_Machine from "./Component JS Stock/Add_Compo_Machine.js";

import perceuse from "../../assets/images/perceuse.png";
import tournevis from "../../assets/images/tournevis.png";
import marteau from "../../assets/images/marteau.png";
import Decoupe from "../../equipements/decoupeuselaser.jpeg"
import Scanner from "../../equipements/scanner3D.jpg"
import Impr from "../../equipements/imprimante3D.jpg"
import sublim from "../../equipements/sublimation.png"
import Poste from "../../equipements/posteelectronique.jpg"
import Plotteur from "../../equipements/plotteurdecoupe.jpg"
import Fraiseuse from "../../equipements/fraiseusecnc.png"

import axios from "axios";

const ProduitList = (admin) => {
    const [produits2, setProduits2] = useState([]);
    const [produits3, setProduits3] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduits2 = async () => {
            try {
                const response = await axios.get(`https://${config.ipserveur}:${config.portserveur}/stock/getAllProduit2`);
                setProduits2(response.data.produits2);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };

        fetchProduits2();
    }, []);


    useEffect(() => {
        const fetchProduits3 = async () => {
            try {
                const response = await axios.get(`https://${config.ipserveur}:${config.portserveur}/stock/getAllProduit3`);
                setProduits3(response.data.produits3);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };

        fetchProduits3();
    }, []);

    return (
        <div>
            <h1>Liste des Machines & Outils</h1>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (

                <div className="product-container">
                    <Product_Card_Machine product={{
                        name: "Découpeuse laser",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Decoupe
                    }} />
                    <Product_Card_Machine product={{
                        name: "Scanner 3D",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Scanner
                    }} />
                    <Product_Card_Machine product={{
                        name: "Poste à souder",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Poste
                    }} />
                    <Product_Card_Machine product={{
                        name: "Fraiseuse",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Fraiseuse
                    }} />
                    <Product_Card_Machine product={{
                        name: "Plotteur de coupe",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Plotteur
                    }} />
                    <Product_Card_Machine product={{
                        name: "Sublimation",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: sublim
                    }} />
                    <Product_Card_Machine product={{
                        name: "Imprimante 3D",
                        pret: "2024-01-20",
                        nbJour: 3,
                        reserved: false,
                        is_late: false,
                        image: Impr
                    }} />
                    <Product_Card_Outils key={1}
                        product={{
                            name: "Perceuse sans fil",
                            pret: "2024-01-20",
                            nbJour: 3,
                            reserved: false,
                            is_late: false,
                            image: perceuse,
                        }}
                        admin={admin}
                    />
                    <Product_Card_Outils key={2}
                        product={{
                            name: "Tournevis",
                            pret: "2024-01-20",
                            nbJour: 3,
                            reserved: false,
                            is_late: false,
                            image: tournevis
                        }}
                        admin={admin}
                    />
                    <Product_Card_Outils key={3}
                        product={{
                            name: "Marteau",
                            pret: "2024-01-20",
                            nbJour: 3,
                            reserved: false,
                            is_late: false,
                            image: marteau,
                        }}
                        admin={admin}
                    />

                    {produits2.map((produit) => (
                        <Product_Card_Outils key={produit._id}
                            product={{
                                name: produit.name,
                                pret: produit.pret,
                                nbJour: produit.nbJour,
                                reserved: produit.reserved,
                                is_late: produit.is_late,
                                image: `https://${config.ipserveur}:${config.portserveur}/uploads/${produit.image1}`,  // Utilisez le préfixe /uploads
                            }}
                            admin={admin}
                        />
                    ))}
                    {produits3.map((produit) => (
                        <Product_Card_Machine key={produit._id}
                            product={{
                                name: produit.name,
                                pret: produit.pret,
                                nbHeure: produit.nbJour,
                                reserved: produit.reserved,
                                is_late: produit.is_late,
                                image: `https://${config.ipserveur}:${config.portserveur}/uploads/${produit.image1}`,  // Utilisez le préfixe /uploads
                            }}
                            admin={admin}
                        />
                    ))}
                    {admin && (
                        <Add_Compo_Machine admin={admin} />
                    )}
                    {admin && (
                        <Add_Compo_Outils admin={admin} />
                    )}
                </div>
            )}
        </div>
    );
};

const Machine = () => {


    let admin = false;
    return (

        <div>
            <Header icon={"cash-outline"}
                title={"Stockage"}
                position={false}
                destination='/Stockage'
            ></Header>
            <section>
                <ProduitList admin={admin} />

            </section>
            <Navigation
                library={true}
                search={false}
                map={false}
                profil={false}
                setting={false}
                position={false}
            />
        </div>
    );
};

export default Machine;
