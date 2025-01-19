class ffgSettings extends FormApplication {
  activateListeners(html) {
    super.activateListeners(html);
    html.find("button.filepicker").click(this._onFilePicker.bind(this));
  }

  getData(acceptableSettings) {
    const canConfigure = game.user.can("SETTINGS_MODIFY");
    let includeSettings = [];
    for (const setting of game.settings.settings) {
      if (acceptableSettings.includes(setting[0])) {
        const s = foundry.utils.duplicate(setting[1]);
        s.name = game.i18n.localize(s.name);
        s.hint = game.i18n.localize(s.hint);
        s.value = game.settings.get(s.namespace, s.key);
        s.type = setting.type instanceof Function ? setting.type.name : "String";
        s.isCheckbox = setting[1].type === Boolean;
        s.isSelect = s.choices !== undefined;
        s.isRange = setting[1].type === Number && s.range;
        s.isFilePicker = setting.valueType === "FilePicker";
        includeSettings.push(s);
      }
    }

    const data = {
      system: {title: game.system.title, menus: [], settings: includeSettings},
    };

    // Return data
    return {
      user: game.user,
      canConfigure: canConfigure,
      systemTitle: game.system.title,
      data: data,
    };
  }

  _onFilePicker(event) {
    event.preventDefault();

    const fp = new FilePicker({
      type: "image",
      callback: (path) => {
        $(event.currentTarget).prev().val(path);
        //this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10,
    });
    return fp.browse();
  }

    /** @override */
  async _updateObject(event, formData) {
    for (let [k, v] of Object.entries(foundry.utils.flattenObject(formData))) {
      let s = game.settings.settings.get(k);
      let current = game.settings.get(s.namespace, s.key);
      if (v !== current) {
        await game.settings.set(s.namespace, s.key, v);
      }
    }
  }
}

export class rulesetSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "ruleset-settings",
      classes: ["genesysk2", "ruleset-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.ruleset.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
        "genesysk2.dicetheme",
        "genesysk2.vehicleRangeBand",
        "genesysk2.skilltheme",
        "genesysk2.enableForceDie",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class uiSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "ui-settings",
      classes: ["genesysk2", "ui-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.ui.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.ui-uitheme",
      "genesysk2.ui-pausedImage",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class combatSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "combat-settings",
      classes: ["genesysk2", "combat-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.combat.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.useGenericSlots",
      "genesysk2.initiativeRule",
      "genesysk2.removeCombatantAction",
      "genesysk2.useDefense",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class actorSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "actor-settings",
      classes: ["genesysk2", "actor-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.actor.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.enableSoakCalc",
      "genesysk2.talentSorting",
      "genesysk2.showMinionCount",
      "genesysk2.showAdversaryCount",
      "genesysk2.adversaryItemName",
      "genesysk2.maxAttribute",
      "genesysk2.maxSkill",
      "genesysk2.medItemName",
      "genesysk2.HealingItemAction",
      "genesysk2.RivalTokenPrepend",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class xpSpendingSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "xpSpending",
      classes: ["genesysk2", "xpSpending"],
      title: `${game.i18n.localize("SWFFG.Settings.xpSpending.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.specializationCompendiums",
      "genesysk2.signatureAbilityCompendiums",
      "genesysk2.forcePowerCompendiums",
      "genesysk2.talentCompendiums",
      "genesysk2.notifyOnXpSpend",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class localizationSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "localization",
      classes: ["genesysk2", "localization"],
      title: `${game.i18n.localize("SWFFG.Settings.localization.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.skillSorting",
      "genesysk2.destiny-pool-light",
      "genesysk2.destiny-pool-dark",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class groupManagerSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "group-manager",
      classes: ["genesysk2", "group-manager"],
      title: `${game.i18n.localize("SWFFG.Settings.groupManager.Title")}`,
      template: "systems/genesysk2/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "genesysk2.pcListMode",
      "genesysk2.privateTriggers",
      "genesysk2.GMCharactersInGroupManager"
    ];
    return super.getData(includeSettingsNames);
  }
}