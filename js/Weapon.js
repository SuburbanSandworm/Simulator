function Weapon(weaponJSON) {

    this.name = weaponJSON.name;
    this.weaponType = weaponJSON.weaponType;
    this.rank = weaponJSON.rank;
    this.uses = weaponJSON.uses;
    this.maxUses = weaponJSON.uses;
    this.weight = weaponJSON.weight;
    this.might = weaponJSON.might;
    this.hit = weaponJSON.hit;
    this.crit = weaponJSON.crit;
    this.minRange = weaponJSON.minRange;
    this.maxRange = weaponJSON.maxRange;
    this.weaponExp = weaponJSON.weaponExp;
    this.cost = weaponJSON.cost;

    this.usedBy = weaponJSON.usedBy;

    this.reaver = weaponJSON.reaver;
    this.brave = weaponJSON.brave;

    this.effectiveAgainst = weaponJSON.effectiveAgainst;

    this.statBoosts = weaponJSON.statBoosts;
}

Weapon.prototype = {
    physicalTypes: ["sword", "lance", "axe", "bow"],
    magicTypes: ["dark", "light"],

    isPhysical: function () {
        return this.physicalTypes.contains(this.weaponType);
    },

    isMagical: function () {
        return this.magicTypes.contains(this.weaponType);
    },

    weaponTriangleBonus: function (that) {
        // Return 1 if the attacker has a bonus due to the triangle.
        // Return 0 if there is no bonus.
        // Return -1 if the attacker suffers a penalty due to the triangle.
        // Return 2 or -2 for reaver bonus vs non-reaver weapon in triangle.

        if (this.weaponType === 'sword') {

            if (this.reaver && !that.reaver || !this.reaver && that.reaver) {
                if (that.weaponType === 'lance') return 2;
                else if (that.weaponType === 'axe') return -2;
                else return 0;
            }

            if (that.weaponType === 'axe') return 1;
            else if (that.weaponType === 'lance') return -1;
            else return 0;
        }

        if (this.weaponType === 'axe') {

            if (this.reaver && !that.reaver || !this.reaver && that.reaver) {
                if (that.weaponType === 'sword') return 2;
                else if (that.weaponType === 'lance') return -2;
                else return 0;
            }

            if (that.weaponType === 'lance') return 1;
            else if (that.weaponType === 'sword') return -1;
            else return 0;
        }

        if (this.weaponType === 'lance') {

            if (this.reaver && !that.reaver || !this.reaver && that.reaver) {
                if (that.weaponType === 'axe') return 2;
                else if (that.weaponType === 'sword') return -2;
                else return 0;
            }

            if (that.weaponType === 'sword') return 1;
            else if (that.weaponType === 'axe') return -1;
            else return 0;
        }

        if (this.weaponType === 'bow') {
            if (that.weaponType === 'light') return 1;
            else if (that.weaponType === 'dark') return -1;
            else return 0;
        }

        if (this.weaponType === 'light') {
            if (that.weaponType === 'dark') return 1;
            else if (that.weaponType === 'bow') return -1;
            else return 0;
        }

        if (this.weaponType === 'dark') {
            if (that.weaponType === 'bow') return 1;
            else if (that.weaponType === 'light') return -1;
            else return 0;
        }

        console.log('Unknown weapon type: ' + this.weaponType);
        return 0;
    }
};