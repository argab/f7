<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>Список Грузовиков</f7-nav-title>
        </f7-navbar>
        <f7-block>
            <div class="list accordion-list">
                <ul v-if="trucks.length" class="trucks">
                    <li class="trucks-item accordion-item" v-for="truck in trucks">
                        <a href="#" class="item-content item-link">
                            <div class="item-inner">
                                <div class="item-title">{{ truck.nameTruck }}</div>
                                <div class="trucks-item-actions">
                                    <i class="f7-icons size-22"
                                       @click="edit(truck)"
                                       title="Редактировать">edit</i>
                                    <i class="f7-icons size-22"
                                       @click="remove(truck.id)"
                                       title="Удалить">trash</i>
                                </div>
                            </div>
                        </a>
                        <div class="accordion-item-content">
                            <div class="block">
                                <p>{{ truck.comment }}</p>
                                <p>Цена: <span class="trucks-item-price">{{ truck.price }} $</span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </f7-block>
        <f7-block>
            <f7-button class="col" raised fill @click="edit(null)" title="Добавить грузовик">Добавить грузовик
            </f7-button>
        </f7-block>
        <div v-if="loading" class="preloader-overlay">
            <div class="preloader color-blue"></div>
        </div>
    </f7-page>
</template>
<script>

    import Service from '../service';

    export default {

        data() {
            return {
                trucks: [],
                loading: false
            };
        },

        methods: {

            edit(truck) {
                this.$root.truck = truck;
                this.$f7router.navigate('/form/')
            },

            getTrucks() {

                this.loading = true;

                Service.axios()
                    .get($params.getTrucks)
                    .then(response => {
                        if (response.statusText !== 'OK') {
                            Service.notify(this, '<h3>Ошибка</h3>', 'Не удалось загрузить список.');
                            this.loading = false;
                            return false;
                        }

                        this.trucks = this.trucks.concat(response.data);
                        this.loading = false;
                    })
                ;
            },

            remove(id) {

                const itemId = parseInt(id);

                this.loading = true;

                Service.axios()
                    .delete($params.deleteTruck + itemId)
                    .then(response => {
                        if (response.statusText !== 'OK') {
                            Service.notify(this, '<h3>Ошибка</h3>', 'Не удалось завершить процедуру удаления.');
                            this.loading = false;
                            return false;
                        }
                        this.trucks.forEach((item, i) =>
                        {
                            if (parseInt(item.id) === itemId){
                                this.trucks.splice(i,1);
                                return false;
                            }
                        });
                        this.loading = false;
                    });
            }
        },

        created() {
            this.getTrucks();
        }
    }
</script>
