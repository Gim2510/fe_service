import type {ActionDetail} from "../types/DashboardTypes.ts";

export const actionDetails: Record<number, ActionDetail> = {
    0: {
        title: "Policy di sicurezza IT",
        context:
            "La sicurezza informatica non riguarda solo attacchi esterni, ma anche errori interni, accessi non controllati e gestione impropria delle informazioni.",
        risks: [
            "Accessi non autorizzati ai sistemi",
            "Perdita o esposizione di dati sensibili",
            "Responsabilità legali e reputazionali"
        ],
        actions: [
            "Definizione di ruoli e livelli di accesso",
            "Policy su password e autenticazione",
            "Procedure di gestione incidenti",
            "Formazione base del personale"
        ],
        outcome:
            "Riduzione del rischio operativo e maggiore affidabilità dell’infrastruttura digitale."
    },

    1: {
        title: "Backup automatico e continuità operativa",
        context:
            "I dati sono un asset strategico. Senza backup strutturati, ogni errore tecnico o umano può trasformarsi in un blocco operativo totale.",
        risks: [
            "Perdita irreversibile di dati critici",
            "Interruzione prolungata delle attività",
            "Costi elevati di ripristino"
        ],
        actions: [
            "Backup automatici giornalieri",
            "Replica su storage esterno o cloud",
            "Test periodici di ripristino",
            "Definizione RPO e RTO"
        ],
        outcome:
            "Continuità del business garantita anche in caso di incidenti o guasti."
    },

    2: {
        title: "Gestione documentale centralizzata",
        context:
            "Documenti distribuiti su più strumenti generano inefficienze, duplicazioni e perdita di controllo.",
        risks: [
            "Versioni multiple dello stesso documento",
            "Difficoltà di collaborazione",
            "Perdita di informazioni chiave"
        ],
        actions: [
            "Repository unico e condiviso",
            "Permessi per ruolo",
            "Versioning automatico",
            "Ricerca e tagging documenti"
        ],
        outcome:
            "Processi più rapidi, tracciabili e collaborativi."
    }
}