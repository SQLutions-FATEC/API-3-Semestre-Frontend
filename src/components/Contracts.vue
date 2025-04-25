<script>
import { DatePicker } from 'ant-design-vue';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import company from '@/services/company';
import role from '@/services/role';

export default {
  name: 'Contracts',

  components: {
    'a-range-picker': DatePicker.RangePicker,
    CloseOutlined,
    PlusOutlined,
  },

  setup(props, { emit }) {
    const dateFormatList = 'DD/MM/YYYY HH:mm';

    const companyOptions = ref([]);
    const isRoleModalOpened = ref(false);
    const newRole = ref('');
    const roleOptions = ref([]);
    const selectedCompanyId = ref('');
    const selectedCompanyData = ref({});
    const selectedDatetime = ref([]);
    const selectedRoleId = ref('');
    const selectedRoleData = ref({});
    const selectedContracts = ref([]);

    const addContract = () => {
      if (
        !(
          selectedCompanyData.value && Object.keys(selectedCompanyData.value)
        ) ||
        !(selectedRoleData.value && Object.keys(selectedRoleData.value)) ||
        !selectedDatetime.value.length
      ) {
        return alert(
          'Empresa, função e datas de contrato devem estar preenchidos'
        );
      }

      emit('add-contract', {
        company: {
          id: selectedCompanyData.value.id,
          name: selectedCompanyData.value.name,
        },
        role: {
          id: selectedRoleData.value.id,
          name: selectedRoleData.value.name,
        },
        datetime_start: selectedDatetime.value[0],
        datetime_end: selectedDatetime.value[1],
      });

      selectedCompanyId.value = '';
      selectedCompanyData.value = {};
      selectedRoleId.value = '';
      selectedRoleData.value = {};
      selectedDatetime.value = [];
    };

    const addRole = async () => {
      if (newRole.value.trim()) {
        const params = {
          role: newRole.value,
        };
        try {
          await role.post(params);
          newRole.value = '';
        } catch (error) {
          console.error(error);
        }
        isRoleModalOpened.value = false;
        selectedRoleId.value = '';
        selectedRoleData.value = {};
        await fetchRoles();
        ensureAddNewIsLast();
      }
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = roleOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      roleOptions.value = [
        ...regularOptions,
        { value: 'add-new', label: '➕ Adicionar Função' },
      ];
    };

    const fetchCompanies = async () => {
      try {
        const response = await company.get();
        companyOptions.value = response.data.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await role.get();
        roleOptions.value = response.data.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));
        ensureAddNewIsLast();
      } catch (error) {
        console.error('Erro ao buscar funções:', error);
      }
    };

    const fillContracts = (contracts) => {
      selectedContracts.value = contracts;
    };

    const handleCompanyChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        selectedCompanyId.value = value;
        selectedCompanyData.value = selectedOptions[0].data;
      }
    };

    const handleRoleChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        if (value.includes('add-new')) {
          openRoleModal();
          ensureAddNewIsLast();
        } else {
          selectedRoleId.value = value;
          selectedRoleData.value = selectedOptions[0].data;
        }
      }
    };

    const openRoleModal = () => {
      isRoleModalOpened.value = true;
    };

    const removeContract = (index) => {
      selectedContracts.value.splice(index, 1);
    };

    const resetContracts = () => {
      selectedContracts.value = [];
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchRoles()]);
    });

    return {
      addContract,
      addRole,
      companyOptions,
      dateFormatList,
      fillContracts,
      handleCompanyChange,
      handleRoleChange,
      isRoleModalOpened,
      newRole,
      openRoleModal,
      removeContract,
      resetContracts,
      roleOptions,
      selectedCompanyId,
      selectedCompanyData,
      selectedContracts,
      selectedDatetime,
      selectedRoleId,
      selectedRoleData,
    };
  },
};
</script>

<template>
  <div class="contracts">
    <h1>Contratos</h1>
    <div class="contracts__content">
      <a-cascader
        v-model:value="selectedCompanyId"
        placeholder="Empresa"
        style="width: 100%"
        :options="companyOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }"
        @change="handleCompanyChange"
      />
      <a-cascader
        v-model:value="selectedRoleId"
        placeholder="Função"
        style="width: 100%"
        :options="roleOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) => {
              if (option.value === 'add-new') return false;
              return option.label
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        }"
        @change="handleRoleChange"
      />
      <a-range-picker
        v-model:value="selectedDatetime"
        style="width: 100%"
        show-time
        :format="dateFormatList"
        :placeholder="['Data início', 'Data fim']"
        :time-picker-props="{ format: 'HH:mm' }"
      />
      <a-button type="primary" shape="circle" @click="addContract">
        <template #icon>
          <plus-outlined />
        </template>
      </a-button>
    </div>
    <div class="contracts__list">
      <div
        v-for="(contract, index) in selectedContracts"
        :key="index"
        class="list"
      >
        <p>
          Empresa: {{ contract.company.name }} / Função:
          {{ contract.role.name }} / Início: {{ contract.datetime_start }} /
          Fim:
          {{ contract.datetime_end }}
        </p>
        <a-button type="primary" shape="circle" @click="removeContract(index)">
          <template #icon>
            <close-outlined />
          </template>
        </a-button>
      </div>
    </div>
    <a-modal v-model:open="isRoleModalOpened" title="Nova Função" @ok="addRole">
      <a-input v-model:value="newRole" placeholder="Digite a nova função" />
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.contracts {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;
  flex: 1 1 auto;

  h1 {
    @include heading(large);
  }
  .contracts__content {
    display: flex;
    gap: $spacingXxl;
  }
  .contracts__list {
    display: flex;
    flex-direction: column;
    gap: $spacingLg;

    .list {
      display: flex;
      align-items: center;
      gap: $spacingXxl;
    }
  }
}
</style>
