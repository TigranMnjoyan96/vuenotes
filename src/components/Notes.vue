<template>
  <div>
    <div class="col-lg-3 mx-auto mb-2">
      <div>
        <label for="title">Title</label>
        <input class="form-control" type="text" id="title" v-model="newTitle" />
        <label for="area" class="mt-3">Description</label>
        <textarea
          name=""
          id="area"
          class="form-control"
          cols="42"
          v-model="newDescription"
        ></textarea>
        <button
          class="btn btn-primary mt-2"
          type="button"
          :disabled="!isEmpty"
          @click.enter="addNewNote"
        >
          Add
        </button>
      </div>
    </div>

    <div class="col-lg-6 mx-auto snotes">
      <table class="table" v-if="getNotes.length">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody class="tbody-light">
          <tr v-for="(note, key) in getNotes" :key="note.id">
            <th>{{ key + 1 }}</th>
            <td>{{ note.title }}</td>
            <td>{{ note.descr }}</td>
            <td>{{ note.date }}</td>
            <td class="action">
              <i class="material-icons delete" @click="remove(note.id)"
                >delete</i
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h2>You havn't Notes</h2>
      </div>

      <div v-if="getNotes.length" class="row">
        <div class="container">
          <div :class="['text-right mt-3 toggle__icons', { active: 'toggle' }]">
            <i
              :class="['material-icons', { active: toggle }]"
              @click="toggle = true"
              >view_week</i
            >
            <i
              :class="['material-icons', { active: !toggle }]"
              @click="toggle = false"
              >view_list</i
            >
          </div>

          <div class="search__panel">
            <input
              type="text"
              class="form-control col-4"
              v-model="search"
              placeholder="Search"
            />
            <button class="btn btn-success mt-2">Search Notes</button>
          </div>

          <div
            :class="[
              'd-flex  flex-wrap',
              { 'justify-content-between': toggle, 'flex-column': !toggle },
              'all__notes',
            ]"
          >
            <!-- all notes -->
            <div
              :class="[
                'card',
                { 'col-lg-5 mt-3': toggle, 'col-lg-12 mt-2': !toggle },
              ]"
              v-for="note in getNotes"
              :key="note.id"
            >
              <div class="card-body">
                <i class="material-icons close__card" @click="remove(note.id)"
                  >close</i
                >
                <h5 class="card-title">{{ note.title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ note.descr }}</h6>
                <p class="card-text">{{ note.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  props: {
    notes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTitle: "",
      newDescription: "",
      toggle: true,
    };
  },
  computed: {
    getNotes() {
      return this.notes;
    },
    isEmpty() {
      return (this.newTitle && this.newDescription).trim().length > 0;
    },
  },
  
  methods: {
    addNewNote() {
      const { newTitle, newDescription } = this;
      if (
        (this.newTitle.trim().length && this.newDescription.trim().length) > 0
      ) {
        this.notes.push({
          id: Date.now(),
          title: newTitle,
          descr: newDescription,
          date: new Date(Date.now()).toLocaleString(),
        });
      }
      this.newTitle = "";
      this.newDescription = "";
    },
    remove(id) {
      this.$emit("removeChild", id);
    },
  },
};
</script>

<style lang="scss">
tbody {
  .action {
    text-align: center;

    i {
      color: tomato;
      cursor: pointer;

      &::before {
        content: "" !important;
      }
    }
  }
}

.all__notes {
  padding: 3rem 0;
  position: relative;
}

.toggle__icons {
  i {
    color: grey;
    font-size: 2rem;

    &:hover {
      color: rgb(25, 168, 216);
      cursor: pointer;
    }
  }
}

.active {
  color: rgb(25, 168, 216) !important;
}

.close__card {
  position: absolute;
  top: 5%;
  right: 3%;
  color: grey;
  cursor: pointer;
}
</style>
