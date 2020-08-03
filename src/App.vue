<template>
<div>
    <h2>{{title}}</h2>
      
      <Notes :notes="notes" @removeChild="remove"/>
</div>
</template>

<script>

import Notes from './components/Notes'


export default {
    name: "App",
    components: {
      Notes
    },
    data() {
        return {
            title: "Notes App",
            notes: [{
                    id: 0,
                    title: 'First Note',
                    descr: 'Description for first',
                    date: new Date(Date.now()).toLocaleString()
                },
                {
                    id: 1,
                    title: 'Second Note',
                    descr: 'Description for second',
                    date: new Date(Date.now()).toLocaleString()
                },
                {
                    id: 2,
                    title: 'Third Note',
                    descr: 'Description for third',
                    date: new Date(Date.now()).toLocaleString()
                }
            ]
        }
    },
    methods: {
      remove(id) {
        this.notes = this.notes.filter(e => e.id !== id)
      }
    }
};
</script>

<style lang="scss">

@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


* {
        font-family: Verdana;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .notes {
        padding-top: 20px;
    }

    .notes table, th, td {
        border: 1px dashed black;
    }
    h2 {
        text-align: center;
    }
</style>
