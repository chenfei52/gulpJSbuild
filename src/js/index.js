$(()=>{
    $('.scheme-items').on('click', 'div.item', (e)=>{
        let id = e.target.id;
        $('.scheme-items .item').each(function(){
            let className = $(this).attr('class');
            if(className.indexOf('active') !== -1){
                $(this).attr('class', className.replace(' active', ''));
            }
        });
        $(e.target).attr('class', e.target.className + ' active');
    })
});
