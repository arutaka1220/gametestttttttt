import { world } from "mojang-minecraft";
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui";

const clickItemId = "minecraft:compass";

world.events.beforeItemUse.subscribe(ev => {
    const { source, item } = ev;
    if(item.id !== clickItemId) return;

    menu01(source);
});

function menu01(player) {
    new ActionFormData()
    .title("Menu01")
    .body("Body")
    .button("Next To ModalForm")
    .show(player).then(response => {
        let selectButton = response.selection;
        if(selectButton === 0) menu02(player);
    });
}

function menu02(player) {
    new ModalFormData()
    .title("ModalForm")
    .dropdown("dropdown-Label", ["option 1", "option 2"], 0)
    .slider("slider-Label", 0, 10, 1)
    .textField("textField-Label", "TextField")
    .toggle("toggle-Label", false)
    .show(player).then(response => {
        let dropdown = response.formValues[0];
        let slider = response.formValues[1];
        let textField = response.formValues[2];
        let toggle = response.formValues[3];

        player.tell(`DropDown: ${dropdown}, Slider: ${slider}, textfield: ${textField}, toggle: ${toggle}`);
        menu03(player);
    });
}

function menu03(player) {
    new MessageFormData()
    .title("Message Form")
    .body("Menu01に戻りますか？")
    .button1("戻ります")
    .button2("もどるわけないだろばーか！")
    .show(player).then(response => {
        let selectButton = response.selection === 1;
        if(selectButton === true) menu01(player);
    });
}