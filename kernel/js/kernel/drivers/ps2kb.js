(function() {
    function PS2Keyboard() { }
    
    PS2Keyboard.LED_SCROLL = 1;
    PS2Keyboard.LED_NUM    = 2;
    PS2Keyboard.LED_CAPS   = 4;
    
    PS2Keyboard.prototype.led = function(status) {
        while(Kernel.inb(0x60) != 0);;
        Kernel.outb(0x60, 0xED);
        while(Kernel.inb(0x60) != 0);;
        Kernel.outb(0x60, status);
    };
    
    PS2Keyboard.prototype.enable = function() {
        var self = this;
        Kernel.isrs[33] = function() {
            self.onInterrupt();
        };
    };
    
    PS2Keyboard.prototype.disable = function() {
        Kernel.isrs[33] = null;
    };
    
    PS2Keyboard.prototype.onInterrupt = function() {
        var scanCode = Kernel.inb(0x60);
        if(typeof this.onScanCode === "function") {
            this.onScanCode(scanCode);
        }
    };
    
    Drivers.PS2Keyboard = PS2Keyboard;
})();