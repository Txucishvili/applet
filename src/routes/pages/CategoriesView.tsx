import { BlockListContext } from "../../ui/components/BlockList/BlockListContext";
import BlockListRender from "../../ui/components/BlockList/BlockList";
import { SwitchComponent } from "@/utils/utils";
import { useRef, useState } from "react";



const TitlerComponent = ({ children }) => {
  return <div>{children}</div>
}
export enum BlockListSchema {
  BlockList = "BlockList"
}


function CategoriesView() {

  return (
    <div className='container-outer'>
      <BlockListContext.Provider>

        <SwitchComponent
          type="switch"
          schema={BlockListSchema}
          name="BlockListWrap"
          target="BlockList"
          component="BlockList">
          <BlockListRender key={BlockListSchema.BlockList}></BlockListRender>
        </SwitchComponent>

      </BlockListContext.Provider>
    </div>
  )
};

// const Memo = memo(CategoriesView, () => true);

export default CategoriesView;