package cn.com.hszl.services.intf;

import java.util.List;

import cn.com.hszl.biz.ds.form.TenantForm;

public interface IADPServiceTenant {
   public TenantForm addTenant(TenantForm tenant);
   
   public List<TenantForm> listTenants();
}
